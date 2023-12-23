const TransactionModel = require('../models/transaction-model');
const CategoryModel = require('../models/category-model');
const ApiError = require('../exceptions/api-error')
const { ObjectId } = require('mongoose').Types;

class ReportService {

    async reportAmountByMonth(userId, direction, period) {
        //const userId = "656893efe014546b05a19b7b"  
        
        const query = {
            user: new ObjectId(userId),
        };

        const data = await
            TransactionModel.aggregate([
                { $match: query},

                { $group: {
                  _id: { $dateToString: { date: "$transdate", format: "%Y-%m" } },
                  total: { $sum: "$amount" }
                }}
              ])
        
        const dates = data.map(entry => entry._id ); //
        const totals = data.map(entry => entry.total);
    
        return {labels: dates, totals: totals};
    }

    async reportAmountByCategory(userId, direction, period) {
        const query = {
            user: new ObjectId(userId),
        };

        const report = await TransactionModel
                .aggregate( [ 
                {   $match: query   },
                //{ $sort: { user: 1 } },
                { 
                    $group: {
                        _id:   { category: "$category"},
                        total: { $sum: "$amount" } } 
                },
                { 
                    $lookup: {
                        from: "categories", // Название коллекции, с которой вы хотите сделать join
                        localField: "_id.category", // Поле в текущей коллекции
                        foreignField: "_id", // Поле в коллекции, с которой вы хотите сделать join
                        as: "category",
                    },
                }, 
                { "$match": { "category.direction": { "$eq": direction } } }
            ] )
    
        const categories = report.map(entry => entry.category[0]?.description ); //
        const totals = report.map(entry => entry.total);

        return {labels: categories, totals: totals};
    }


    async reportAmountByAccount(userId, direction, period) {
        const query = {
           user: new ObjectId(userId),
        };

        const report = await TransactionModel
                .aggregate( [ 
                {   $match: query },
                //{ $sort: { user: 1 } },
                { 
                    $group: {
                        _id:   { account: "$account" , category: "$category"},
                        total: { $sum: "$amount" } } 
                },
                {    
                    $lookup: {
                        from: "categories", // Название коллекции, с которой вы хотите сделать join
                        localField: "_id.category", // Поле в текущей коллекции
                        foreignField: "_id", // Поле в коллекции, с которой вы хотите сделать join
                        as: "category",
                    },
                },

                { $match: { "category.direction": direction  } },

                { 
                    $group: {
                        _id:   { account: "$_id.account" },
                        total: { $sum: "$total" } } 
                },
                { 
                    $lookup: {
                        from: "accounts", // Название коллекции, с которой вы хотите сделать join
                        localField: "_id.account", // Поле в текущей коллекции
                        foreignField: "_id", // Поле в коллекции, с которой вы хотите сделать join
                        as: "account",
                    },
                }, 
            ] )
        
        //console.log(report);    

        const accounts = report.map(entry => entry.account[0]?.description ); //
        const totals = report.map(entry => entry.total);

        return {labels: accounts, totals: totals};
    }

}

module.exports = new ReportService()