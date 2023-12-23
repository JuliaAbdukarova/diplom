const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')
const AccountService =  require('../service/account-service')
const { verify } = require('../helpers/token')

class AccountController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при создании счета', errors.array()))
            }
            
            const {description, type, user, iconUrl} = req.body
            const account = await AccountService.create(description, type, user, iconUrl)

            return res.json(account)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const account = await AccountService.delete(req.params?.id)
            return res.json(account)
        }
        catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const account = await AccountService.update(req.params.id, 
                                                        req.body?.description, 
                                                        req.body?.type,
                                                        req.body?.iconUrl)
            return res.json(account)
        } 
        catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const account = await AccountService.getOne(req.params?.id)
            return res.json(account)
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
            let {accounts, lastPage} = await AccountService.getAllByUser(tokenData?.id, search, page, req.query.noLimit);

            const newAccounts = []
            for (const index in accounts)
            {
                const account = await accounts[index].populate({ path: 'type' })
                const newAccount = { _id: account._id,
                                     description: account.description, 
                                     type: account.type?.description,
                                     iconUrl: account.iconUrl}
                newAccounts.push(newAccount)
            } 

            res.send({ data: { accounts: newAccounts, lastPage}});
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new AccountController()