const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')
const AccountTypeService =  require('../service/account-type-service')
const { verify } = require('../helpers/token')

class AccountTypeController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при создании типа счета', errors.array()))
            }
            
            const {description, user} = req.body
            const accountType = await AccountTypeService.create(description, user)

            return res.json(accountType)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const accountType = await AccountTypeService.delete(req.params?.id)
            return res.json(accountType)
        }
        catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const accountType = await AccountTypeService.update(req.params.id, req.body?.description)
            return res.json(accountType)
        } 
        catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const accountType = await AccountTypeService.getOne(req.params?.id)
            
            return res.json(accountType)
        }
        catch (e) {
            next(e)
        }
    }

    async getAllByUser(req, res, next) {
        //if (!req.cookies?.token)
        //    return
        try {
            const search = req.query ? req.query.search : '';
            const page = req.query? req.query.page : PAGE_START;

            const tokenData = verify(req.cookies.token)
            //console.log('tokenData.id = ',tokenData.id);
            const {accountTypes, lastPage} = await AccountTypeService.getAllByUser(tokenData?.id, search, page);
            res.send({ data: { accountTypes , lastPage}});
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new AccountTypeController()