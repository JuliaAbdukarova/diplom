const {Schema, model} = require('mongoose')

const AccountSchema = new Schema( {
    description: { type: String, required: true },
    type: { type: Schema.Types.ObjectId, ref: 'AccountType', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    iconUrl: { type: String, required: false }
},{timestamps: true})

module.exports = model('Account', AccountSchema)