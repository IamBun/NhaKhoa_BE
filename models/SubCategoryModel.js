const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
   name:{
      type: String
   },
   price: {
      type: Number
   },
   category: {
      type: Schema.Types.ObjectId,
      ref:'category'
   }
});

module.exports = mongoose.model('subCategory', SubCategorySchema)