const passport = require('passport')
const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/get-post/:postId',
postController.getPost)

router.get('/all-posts', 
postController.getPostsByCondition)

router.post('/create-post', 
passport.authenticate('jwt', { session: false }), 
postController.createPost)

router.post('/update-post/:postId', 
passport.authenticate('jwt', { session: false }), 
postController.updatePost)

router.post('/delete-post/:postId', 
passport.authenticate('jwt', { session: false }), 
postController.deletePost)


module.exports = router;
