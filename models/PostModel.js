const mongoose = require('mongoose');
const mongoosePlugin = require('../utils/mongoose');
mongoose.plugin(mongoosePlugin);

const Schema = mongoose.Schema;

// POST in Category 
const PostSchema = new Schema({
   title: {
      type: String,
      require:true,
   },
   content: {
      type:String,
      require:true
   },
   category: {
      type: Schema.Types.ObjectId,
      ref:'category'
   },
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
      }
});

const postModel = mongoose.model('post', PostSchema);

postModel.getPosts = (data, callback) => {
   let options = {};
   options['sort'] = data.sort || { created_at: -1 };
   if (data.limit != undefined) options['limit'] = Number(data.limit);
   if (data.page != undefined) options['page'] = Number(data.page);
   let filter = {};
   if (data.filter && Object.keys(data.filter).length > 0) {
       var fArr = [];
       Object.keys(data.filter).forEach(function (value) {
           if (PostSchema.paths[value]) {
               let f = {};
               if (Array.isArray(data.filter[value])) {
                   if (data.filter[value].length > 0) f[value] = { $in: data.filter[value] }
               } else if (typeof data.filter[value] == "number"
               || typeof data.filter[value] == 'object' ||
               postModel.schema.paths[value].instance == 'ObjectID'
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
   if (data.search && typeof (data.search) == 'string' && data.search.length) {
    if (!filter['$and']) filter['$and'] = [];
    filter.$and.push({
        $or: [{ "title": { '$regex': data.search, '$options': 'i' } },
              { "content": { '$regex': data.search, '$options': 'i' } },
            //   { "category": { '$regex': data.search, '$options': 'i' } },
            ]
    });
}
   options.select = [];
    options.populate = {
        path:"category"
    }
   return postModel.paginate(filter, options, callback);
 };

module.exports = postModel;