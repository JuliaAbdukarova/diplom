const {Schema, model} = require('mongoose')

const TransactionSchema = new Schema( {
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    transdate: { type: Date, required: true },
    comment: { type: String }
},{timestamps: true})

module.exports = model('Transaction', TransactionSchema)