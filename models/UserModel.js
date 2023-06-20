const mongoose = require('mongoose')
const mongoosePlugin = require('../utils/mongoose');
mongoose.plugin(mongoosePlugin);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
   email: {
      type: String,
    },
    password: {
      type: String,
    },
    userName: {
      type: String,
    },
    role: {
      type:Number,
      default:0
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    dateOfBirth: {
      type: Date
    },
    sex: {
      type: String,
    }
},{
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
});

const userModel = mongoose.model('user', UserSchema);
userModel.getUsers = (data, callback) => {
  let options = {};
  options['sort'] = data.sort || { userName: -1 };
  if (data.limit != undefined) options['limit'] = Number(data.limit);
  if (data.page != undefined) options['page'] = Number(data.page);
  let filter = {};
  if (data.filter && Object.keys(data.filter).length > 0) {
      var fArr = [];
      Object.keys(data.filter).forEach(function (value) {
          if (UserSchema.paths[value]) {
              let f = {};
              if (Array.isArray(data.filter[value])) {
                  if (data.filter[value].length > 0) f[value] = { $in: data.filter[value] }
              } else if (typeof data.filter[value] == "number"
              || typeof data.filter[value] == 'object' ||
              userModel.schema.paths[value].instance == 'ObjectID'
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
        $or: [{ 'userName': { '$regex': data.search, '$options': 'i' } },
            ]
    });
}
  options.select = [];

  return userModel.paginate(filter, options, callback);
};

module.exports = userModel;