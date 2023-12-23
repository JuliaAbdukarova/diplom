const CategoryModel = require('../models/category-model');
const ApiError = require('../exceptions/api-error');
const { PAGE_LIMIT } = require('../constants/paggination');
const { CATEGORY_DIRECTION } = require('../constants/category-direction');

class CategoryService {
    async create (description, direction, user, iconUrl) {
        const category = await CategoryModel.create({description, direction, user, iconUrl})
        return category;
    }

    async delete (id) {
        const category = await CategoryModel.deleteOne({_id:id})
        return category
    }

    async update(_id, description, direction, iconUrl) {
        const category = await CategoryModel.findByIdAndUpdate( _id , 
                                                { description: description , 
                                                 direction: direction ,
                                                 iconUrl: iconUrl },
                                                { returnDocument: 'after' });
        return category
    }

    async getOne(id) {
        const category = await CategoryModel.findById({_id:id});
        return category
    }

    async getAllByUser(user, search = '', page, noLimit, direction) {
        let categories, count = 1;

        const query = {
            user: user, 
            description: {$regex: search, $options: 'i'}
        };
   
        //console.log('service: direction = ', direction); 

        if (direction === CATEGORY_DIRECTION.INCOME 
            || direction === CATEGORY_DIRECTION.EXPENSE )
        {
            query.direction = direction;
        }
    
        if (!noLimit)
        {
            [categories, count] = await Promise.all([
                CategoryModel.find(query)
                    .limit(PAGE_LIMIT)
                    .skip((page-1) * PAGE_LIMIT)
                    .sort({createdAt: -1}),
                CategoryModel.countDocuments(query) 
            ]);
        }
        else 
        {
            categories  = await CategoryModel.find(query)                 
        };
               
        return {
            categories,
            lastPage: Math.ceil(count / PAGE_LIMIT)
        }     
    }
}

module.exports = new CategoryService()