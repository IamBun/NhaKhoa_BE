const passport = require('passport')
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/get-news/:newsId', 
newsController.getNews )

router.get('/all-news',
 newsController.getNewsByCondition )

router.post('/create-news', 
passport.authenticate('jwt', { session: false }), 
newsController.createNews
)

router.post('/update-news/:newsId', 
passport.authenticate('jwt', { session: false }), 
newsController.updateNews
)

router.post('/delete-news', 
passport.authenticate('jwt', { session: false }), 
newsController.deleteNews
)

module.exports = router;