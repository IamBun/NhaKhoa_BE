const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const jwtStrategy = passportJWT.Strategy;
const Admin = require('../models/AdminModel');

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // Bearer + token
jwtOptions.secretOrKey = "secret"; //secret key

//passport login jwt
const loginStrategy = new jwtStrategy(jwtOptions, async function (jwt_payload, cb) {
   try {
      if (!jwt_payload) {
         throw new Error("Token is not valid");
       }
       const email = jwt_payload.name;
     
       const resultAdmin = await Admin.findOne({ $or: [{ email: email }, {userName:email}] })
       
           if (resultAdmin) {
             let admin = {
               id: resultAdmin._doc._id,
               email: resultAdmin._doc.email,
             };
             cb(null, admin);
           } else {
             cb(null, false);
           }
   } catch (error) {
      console.log(error);
   }
  
});

passport.use(loginStrategy);