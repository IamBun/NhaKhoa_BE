const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
   email: {
      type: String,
      require:true
    },
    password: {
      type: String,
      require:true,
    },
    userName: {
      type: String,
    },
    role: {
      type:Number,
      default:999
    },
});

module.exports = mongoose.model('admin', AdminSchema);
