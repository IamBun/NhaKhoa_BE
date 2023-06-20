const passport = require('passport')
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/get-user/:userId',
passport.authenticate('jwt', { session: false }), 
userController.getUser)

router.get('/all-users', 
passport.authenticate('jwt', { session: false }), 
userController.getUserByCondition)

router.post('/create-user', 
passport.authenticate('jwt', { session: false }), 
userController.createUser)

router.post('/update-user/:userId', 
passport.authenticate('jwt', { session: false }), 
userController.updateUser)

router.post('/delete-user/:userId', 
passport.authenticate('jwt', { session: false }), 
userController.deleteUser)


module.exports = router;
