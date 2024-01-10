const express = require('express');

const {loginUser, signupUser, 
    getUser,getUsers, deleteUser,updateUser,createUser} = require('../controllers/userController');


const User = require('../models/userModel');

const { join } = require('lodash');

const router = express.Router();

router.get('/',getUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)




module.exports = router;