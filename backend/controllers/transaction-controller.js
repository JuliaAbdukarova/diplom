const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')
const TransactionService =  require('../service/transaction-service')
const { verify } = require('../helpers/token')

class TransactionController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при создании транзакции', errors.array()))
            }
        
            const { account, category, amount, transdate, comment} = req.body

            const tokenData = verify(req.cookies.token);

            const transaction = await TransactionService.create( tokenData?.id, account, category, amount, transdate, comment)

            return res.json(transaction)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const transaction = await TransactionService.delete(req.params?.id)
            return res.json(transaction)
        }
        catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const transaction = await TransactionService.update(req.params?.id, 
                                                               req.body?.account,
                                                               req.body?.category,
                                                               req.body?.amount,
                                                               req.body?.transdate,
                                                               req.body?.comment )
            return res.json(transaction)
        } 
        catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const transaction = await TransactionService.getOne(req.params?.id)        
            return res.json( {data: {transaction}})
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
            const page = req.query ? req.query.page : PAGE_START;
    
            const tokenData = verify(req.cookies.token);
            const { transactions, lastPage } = await TransactionService.getAllByUser(tokenData?.id, search, page);
        
            //console.log('transactions = ', transactions);
            res.send({ data: { transactions, lastPage } });
        } catch (e) {
            next(e);
        }
    }
    
}

module.exports = new TransactionController()