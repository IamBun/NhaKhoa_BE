const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ScheduleSchema = new Schema({
   name: {
      type: String
   },
   address: {
      type: String
   },
   email: {
      type: String
   },
   phoneNumber: {
      type: String
   },
   Title: {
      type: String
   },
   Content: {
      type: String
   },
})
module.exports = mongoose.model('schedule', ScheduleSchema)