const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
   title: {
      type: String,
   },
   content: {
      type: String,
   },
  
},{
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
      }
})

const newsModel = mongoose.model('news', NewsSchema);
newsModel.getAllNews = (data, callback) => {
   let options = {};
   options['sort'] = data.sort || { updateAt: -1 };
   if (data.limit != undefined) options['limit'] = Number(data.limit);
   if (data.page != undefined) options['page'] = Number(data.page);
   let filter = {};
   if (data.filter && Object.keys(data.filter).length > 0) {
       var fArr = [];
       Object.keys(data.filter).forEach(function (value) {
           if (NewsSchema.paths[value]) {
               let f = {};
               if (Array.isArray(data.filter[value])) {
                   if (data.filter[value].length > 0) f[value] = { $in: data.filter[value] }
               } else if (typeof data.filter[value] == "number"
               || typeof data.filter[value] == 'object' ||
               newsModel.schema.paths[value].instance == 'ObjectID'
               ) {
                   f[value] = data.filter[value];
               } else {
                   f[value] = new RegExp(data.filter[value], 'ig');
               }
 
               if (Object.keys(f).length) fArr.push(f);
           }
       });
       if (fArr.length > 0) filter['$and'] = fArr;
   }
   options.select = [];
 
   return newsModel.paginate(filter, options, callback);
 };

module.exports = newsModel