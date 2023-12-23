const {Schema, model} = require('mongoose')

const AccountTypeSchema = new Schema( {
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
},{timestamps: true})

module.exports = model('AccountType', AccountTypeSchema)