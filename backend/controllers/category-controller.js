const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')
const CategoryService =  require('../service/category-service')
const { verify } = require('../helpers/token')
const { PAGE_START } = require('../constants/paggination');

class CategoryController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            
            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при создании категории', errors.array()))
            }
            
            const {description, direction, user, iconUrl} = req.body
            const category = await CategoryService.create(description, direction, user, iconUrl)

            return res.json(category)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const category = await CategoryService.delete(req.params?.id)
            return res.json(category)
        }
        catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const category = await CategoryService.update(req.params?.id, 
                                                          req.body?.description, 
                                                          req.body?.direction, 
                                                          req.body?.iconUrl)
            return res.json(category)
        } 
        catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const category = await CategoryService.getOne(req.params?.id)        
            return res.json(category)
        }
        catch (e) {
            next(e)
        }
    }

    async getAllByUser(req, res, next) {
        //if (!req.cookies?.token)
        //    return
        try {
            //console.log('controller: req = ', req); 
            const search = req.query.search ? req.query.search : '';
            const page = req.query.page ? req.query.page : PAGE_START;
            const direction = req.query.direction? req.query.direction : '';
            //console.log('controller: direction = ', direction); 
            const tokenData = verify(req.cookies.token)
            //console.log('tokenData.id = ',tokenData.id);
            const {categories, lastPage} 
                = await CategoryService.getAllByUser(tokenData?.id, search, page, req.query.noLimit, direction);
            res.send({ data: { categories , lastPage}});
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new CategoryController()