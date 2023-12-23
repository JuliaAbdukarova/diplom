const AccountTypeModel = require('../models/account-type-model');
const ApiError = require('../exceptions/api-error')
const { PAGE_LIMIT } = require('../constants/paggination');

class AccountTypeService {
    async create (description, user) {
        const accountType = await AccountTypeModel.create({description, user})
        return accountType;
    }

    async delete (id) {
        const accountType = await AccountTypeModel.deleteOne({_id:id})
        return accountType
    }

    async update(id, description) {
        const accountType = await AccountTypeModel.findByIdAndUpdate({_id:id}, 
                                                    {description}, 
                                                    {returnDocument: 'after'});
        return accountType
    }

    async getOne(id) {
        const accountType = await AccountTypeModel.findById({_id:id});
        return accountType
    }

    async getAllByUser(user, search = '', page) {
        const [accountTypes, count] = await Promise.all([
            AccountTypeModel.find({user: user, description: {$regex: search, $options: 'i'}})
                .limit(PAGE_LIMIT)
                .skip((page-1) * PAGE_LIMIT)
                .sort({createdAt: -1}),
            AccountTypeModel.countDocuments({user: user, description: {$regex: search, $options: 'i'}}) 
        ]);

        return {
            accountTypes,
            lastPage: Math.ceil(count / PAGE_LIMIT)
        }     
    }
}

module.exports = new AccountTypeService()