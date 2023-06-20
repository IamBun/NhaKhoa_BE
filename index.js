const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const passport = require('passport');
require("./configs/passport");
const mongoose = require('mongoose');

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASS}@mongopractice.ddclk27.mongodb.net/${process.env.MONGODB_COLLECTION}`;
//connect db
   mongoose.connect(MONGODB_URI);

const PORT = process.env.PORT || 3000;

const app = express();
// app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use("/images", express.static(path.join(__dirname, "images")));

const adminRoutes =  require('./routes/adminRoute');
const newsRoutes =  require('./routes/newsRoute');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const categoryRoutes = require('./routes/categoryRoute');

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/news', newsRoutes);
app.use('/post', postRoutes);
app.use('/category', categoryRoutes);

//Error 
app.use((error, req, res, next) => {
   const status = error.statusCode || 500;
   const message = error.message;
   const data = error.data;
   res.status(status).json({ message: message, data: data });
 });

app.listen(PORT,()=>{
   console.log('This app is listening on port '+ PORT)
});
