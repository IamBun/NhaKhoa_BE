const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
   title: {
      type: String,
   },
   content: {
      type: String,
   },
   name: {
      type: String,
   },
   email: {
      type: String,
   }

})

module.exports = mongoose.model('question', QuestionSchema);