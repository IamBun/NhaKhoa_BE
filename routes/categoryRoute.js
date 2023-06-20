const express = require('express');
const router = express.Router();
const passport = require('passport')

const categoryController = require('../controllers/categoryController');

router.get('/get-category/:categoryId',
categoryController.getCategory)

router.get('/all-category', 
categoryController.getCategoryByCondition)

router.post('/create-category', 
passport.authenticate('jwt', { session: false }), 
categoryController.createCategory)

router.post('/update-category/:categoryId', 
passport.authenticate('jwt', { session: false }), 
categoryController.updateCategory)

router.post('/delete-category/:categoryId', 
passport.authenticate('jwt', { session: false }), 
categoryController.deleteCategory)

module.exports = router;