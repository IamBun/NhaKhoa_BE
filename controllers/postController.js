const moment = require('moment');
const Post = require('../models/PostModel')
const Category = require('../models/CategoryModel')

exports.createPost = async (req,res,next)=>{
   const data = req.body;
   try {
      const category = await Category.findById(data.categoryId);
      const post = new Post({
         title: data.title,
         content: data.content,
         category: category
      })

      await post.save()
      return res.status(200).json({
         message:'Post created successfully !'
       });

   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.updatePost = async (req,res,next) =>{
   const data = req.body
   const params = req.params
   const postId = params.postId
   try {
      const category = await Category.findById(data.categoryId);
      await Post.findByIdAndUpdate({_id: postId},{
         title: data.title,
         content:data.content,
         category:category
      })

      return res.status(200).json({message: 'Post updated successfully !'})
   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.deletePost = async (req,res,next) =>{
   const data = req.body
   const params = req.params
   const postId = params.postId
   try {
      await Post.findByIdAndDelete({_id: postId});
      return res.status(200).json({message: 'Post deleted !'});
       } 
       catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.getPost = async (req,res,next)=>{
   // const data = req.body;
   const params = req.params
   const postId = params.postId
   try {
      const post = await Post.findOne({_id:postId})
      if(!post) {
         const error = new Error("Can not found post");
         error.statusCode = 404;
         throw error
      }
      return res.status(200).json({post:post})
   }
   catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.getPostsByCondition = async (req,res,next)=>{
   const info = req.body;
   if (!info.filter) info.filter = {}
  try {
     Post.getPosts (info, function (err, posts) {
        return res.status(200).json({ posts: posts });
      });
  } catch (err) {
     if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  }
}