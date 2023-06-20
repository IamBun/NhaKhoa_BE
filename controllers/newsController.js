const moment = require('moment');
const News = require('../models/newsModel')

exports.createNews = async (req,res,next)=>{
   const data = req.body;
   try {
      const news = new News({
         title: data.title,
         content: data.content,
      })

      await news.save()
      return res.status(200).json({
         message:'News created successfully !'
       });

   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.updateNews = async (req,res,next) =>{
   const data = req.body;
   const params = req.params
   const newsId = params.newsId
   try {
      await News.findByIdAndUpdate({_id: newsId},{
         title: data.title,
         content:data.content,
      })

      return res.status(200).json({message: 'News updated successfully !'})
   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.deleteNews = async (req,res,next) =>{
   const data = req.body
   try {
      const newsId = data.newsId;
      await News.findByIdAndDelete({_id: newsId});
      return res.status(200).json({message: 'News deleted !'});
       } 
       catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.getNews = async (req,res,next)=>{
   // const data = req.body;
   const params = req.params
   const newsId = params.newsId
   try {
      const news = await News.findOne({_id:newsId})
      if(!news) {
         const error = new Error("Can not found news");
         error.statusCode = 404;
         throw error
      }
      return res.status(200).json({news:news})
   }
   catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.getNewsByCondition = async (req,res,next)=>{
   const info = req.body;
   if (!info.filter) info.filter = {}
  try {
     News.getAllNews (info, function (err, news) {
        return res.status(200).json({ news: news });
      });
  } catch (err) {
     if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  }
}