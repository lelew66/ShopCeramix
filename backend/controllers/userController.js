const User = require('../models/userModel');
const axios = require("axios");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: '4h'})
}

//login user
const loginUser = async (req, res) =>{
   
      const {identifier, password, name,type} = req.body;
    try{
        const user = await User.login( identifier, password, type);
        const token = createToken(user._id);
        // console.log("====> userController.js: loginUser, user:",user.id);
        res.status(200).json({userid: user.id, username: user.username, email:user.email, token});
       
       }catch(error){
          res.status(400).json({error: error.message});
       }
   
    
}

//signup user
const signupUser = async (req, res) => {
  
      const {username, email, password} = req.body;

      try{
       const user = await User.signup(username, email, password);
       const token = createToken(user._id);
       res.status(201).json({username, email, token});
      }catch(error){
         res.status(400).json({error: error.message});
      }
   

}

//get all users
const getUsers = async (req,res) =>{
    const users = await User.find({}).sort({createdAt: -1});
    res.status(200).json(users);
}

//get a single user

const getUser = async (req, res) =>{
    const  {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'})
    }

    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json(user);
}

//create a new user

const createUser = async (req, res) =>{
    const {username, email,password} = req.body;
    try{
     const user = await User.create({username,email,password});
     res.status(200).json(user);
    }catch(err){
       res.status(400).json({err: err.message}); 
    }
}

//delete a user

const deleteUser = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'});
    }
    const user = await User.findOneAndDelete({_id: id});
    if(!user){
        return res.status(404).json({error: 'User not found'});
    }

    res.status(200).json(user);
}

//update a user
const updateUser = async (req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User not found'});
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!user){
        return res.status(404).json({error: 'User not found'});
    }

    res.status(200).json(user); 
}

module.exports = {loginUser, signupUser, getUsers, getUser, createUser, deleteUser, updateUser}

