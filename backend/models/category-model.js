const {Schema, model} = require('mongoose')
const {CATEGORY_DIRECTION} = require('../constants/category-direction')

const CategorySchema = new Schema( {
    description: { type: String, required: true },
    direction:  { type: String, enum: [CATEGORY_DIRECTION.INCOME, CATEGORY_DIRECTION.EXPENSE], required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    iconUrl: { type: String },
},{timestamps: true})

module.exports = model('Category', CategorySchema)

// 