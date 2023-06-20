const moment = require('moment');
const User = require('../models/UserModel')

exports.createUser = async (req,res,next)=>{
   const data = req.body;
   try {
      const user = new User({
        userName: data.userName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        sex: data.sex,
        dateOfBirth: data.dateOfBirth,
      })

      await user.save()
      return res.status(200).json({
         message:'User created successfully !'
       });

   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.updateUser = async (req,res,next) =>{
   const data = req.body
   const params = req.params
   const userId = params.userId.toString()
   try {   
      await User.findByIdAndUpdate({_id: userId},{
        userName: data.userName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        sex: data.sex,
        dateOfBirth: data.dateOfBirth,
      })

      return res.status(200).json({
         message:'User updated successfully !'
       });
   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.deleteUser = async (req,res,next) =>{
   const params = req.params
   const userId = params.userId.toString()
   try {
      await User.findByIdAndDelete({_id: userId})
      return res.status(200).json({
         message:'User deleted !'
       });
       } 
       
       catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.getUser = async (req,res,next)=>{
   // const data = req.body;
   const params = req.params;
   const userId = params.userId;
   try {
      const user = await User.findOne({_id: userId})
      if(!user) {
         const error = new Error("Can not found user");
         error.statusCode = 401;
         throw error;
      }
      return res.status(200).json({
         user:user
       });

   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

//get All Users
exports.getUserByCondition = async (req,res,next)=>{
   const info = req.body;
   if (!info.filter) info.filter = {}
   try {
      User.getUsers (info, function (err, users) {
         return res.status(200).json({ users: users });
       });

   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}