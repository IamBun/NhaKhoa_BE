const Category = require('../models/CategoryModel')

exports.createCategory = async (req,res,next)=>{
   const data = req.body;
   try {
      const category = new Category({
       category:data.category
      })

      await category.save()
      return res.status(200).json({
         message:'Category created successfully !'
       });

   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.updateCategory = async (req,res,next) =>{
   const data = req.body
   const params = req.params
   const categoryId = params.categoryId.toString()
   try {   
      await Category.findByIdAndUpdate({_id: categoryId},{
       category:data.category
      })

      return res.status(200).json({
         message:'Category updated successfully !'
       });
   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.deleteCategory = async (req,res,next) =>{
   const params = req.params
   const categoryId = params.categoryId.toString()
   try {
      await Category.findByIdAndDelete({_id: categoryId})
      return res.status(200).json({
         message:'Category deleted !'
       });
       } 
       
       catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

exports.getCategory = async (req,res,next)=>{
   // const data = req.body;
   const params = req.params;
   const categoryId = params.categoryId;
   try {
      const category = await Category.findOne({_id: categoryId})
      if(!category) {
         const error = new Error("Can not found category");
         error.statusCode = 401;
         throw error;
      }
      return res.status(200).json({
         category:category
       });

   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}

//get All Categoriess
exports.getCategoryByCondition = async (req,res,next)=>{
   const info = req.body;
    info.filter =  info.filter ?  {...info.filter}  : {};
   try {
      Category.getCategories (info, function (err, categories) {
         return res.status(200).json({ categories: categories });
       });

   } catch (err) {
      if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
   }
}