const TransactionModel = require('../models/transaction-model');
const ApiError = require('../exceptions/api-error')
const { PAGE_LIMIT } = require('../constants/paggination');
const moment = require('moment');

class TransactionService {
    async create (user, account, category, amount, transdate, comment) {
        const transdateDate = moment(transdate, "DD.MM.YYYY").toDate();
        const transaction = await TransactionModel.create({ user, 
                                                            account, 
                                                            category, 
                                                            amount, 
                                                            transdate: transdateDate,
                                                            comment })
        return transaction;
    }

    async delete (id) {
        const transaction = await TransactionModel.deleteOne({_id:id})
        return transaction
    }

    async update(id, account, category, amount, transdate, comment) {
        const newTransdate = moment(transdate, "DD.MM.YYYY").toDate();
        const transaction = await TransactionModel.findByIdAndUpdate({_id:id}, 
                                                { account, 
                                                  category, 
                                                  amount, 
                                                  comment,
                                                  $set: {
                                                    "transdate": new Date(newTransdate)
                                                   }
                                                }, 
                                                { returnDocument: 'after'});
        return transaction
    }

    async getOne(id) {
        const transaction = await TransactionModel.findById({_id:id})
                                            .populate( [{path: 'account'},
                                            {path: 'category'},
                                            {path: 'user'}]);
                                            
        //console.log('id =  ', transaction);
        return transaction
    }

    async getAllByUser(user, search = '', page) {
        const [transactions, count] = await Promise.all([
            TransactionModel.find({ user: user, comment: { $regex: search, $options: 'i' } })
                .limit(PAGE_LIMIT)
                .skip((page - 1) * PAGE_LIMIT)
                .sort({ createdAt: -1 })
                .populate( [{path: 'account'},
                            {path: 'category'},
                            {path: 'user'}]),
            TransactionModel.countDocuments({ user: user, comment: { $regex: search, $options: 'i' } })
        ]);   
        return {
            transactions,
            lastPage: Math.ceil(count / PAGE_LIMIT)
        };
    }
}

module.exports = new TransactionService()