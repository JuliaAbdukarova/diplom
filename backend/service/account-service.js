const AccountModel = require('../models/account-model');
const ApiError = require('../exceptions/api-error')
const { PAGE_LIMIT } = require('../constants/paggination');

class AccountService {
    async create (description, type, user, iconUrl) {
        const account = await AccountModel.create({description, type, user, iconUrl})
        return account;
    }

    async delete (id) {
        const account = await AccountModel.deleteOne({_id:id})
        return account
    }

    async update(_id, description, type, iconUrl) {
        const account = await AccountModel.findByIdAndUpdate(_id, 
                                            {description, type, iconUrl}, 
                                            {returnDocument: 'after'});
        return account
    }

    async getOne(id) {
        const account = await AccountModel.findById({_id:id});
        return account
    }

    async getAllByUser(user, search = '', page, noLimit) {
        let accounts, count = 1;
    
        if (noLimit)
        { 
            accounts = await AccountModel.find({user: user, description: {$regex: search, $options: 'i'}})
        }
        else
        {
            [accounts, count] = await Promise.all([
                AccountModel.find({user: user, description: {$regex: search, $options: 'i'}})
                    .limit(PAGE_LIMIT)
                    .skip((page-1) * PAGE_LIMIT)
                    .sort({createdAt: -1}),
                AccountModel.countDocuments({user: user, description: {$regex: search, $options: 'i'}}) 
            ]);
  
        }
      
        return {
            accounts,
            lastPage: Math.ceil(count / PAGE_LIMIT)
        }     
    }

}

module.exports = new AccountService()