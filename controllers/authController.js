const Admin = require('../models/AdminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req,res,next) => {
   const email = req.body.email;
   const password = req.body.password.toString();
   const userName = req.body.userName.toString();

   try {
     const admin = await Admin.findOne({email:email});
       if (admin) {
         const error = new Error("Email is already exists");
         error.statusCode = 400;
         throw error;
     };

     const hashedPassword = await bcrypt.hash(password, 12);
      //add new admin 
      const newAdmin = new Admin({
         email:email,
         password:hashedPassword,
         userName:userName,
      });

      await newAdmin.save();
      
     res.status(201).json({ message: "Sign up success !" });
   } catch (err) {
     if (!err.statusCode) {
       err.statusCode = 500;
     }
     next(err);
   }
}

exports.login = async (req,res,next) => {
   const userLogin = req.body.email;
   const password = req.body.password.toString();
   try {
    //find user in db
     const admin = await Admin.findOne({$or: [{email:userLogin},{userName:userLogin}]});
       if (!admin) {
         const error = new Error("Can not found admin");
         error.statusCode = 401;
         throw error;
     };
     //check pass
     const isEqual = bcrypt.compare(password, admin.password);
     if (!isEqual) {
       const error = new Error("Password is not true");
       error.statusCode = 401;
       throw error;
     }
     let loadedAdmin = admin;

     //generate token
     const token = jwt.sign(
      {
        userId: loadedAdmin._id.toString(),
        name: loadedAdmin.name || loadedAdmin.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      token: token,
      userId: loadedAdmin._id.toString(),
      name: loadedAdmin.name,
    });

   } catch (err) {
     if (!err.statusCode) {
       err.statusCode = 500;
     }
     next(err);
   }
}

