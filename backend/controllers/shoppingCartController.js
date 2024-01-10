const User = require('../models/userModel');
const Product = require('../models/productModel');

//get a user's shopping cart
const getShoppingCart = async (req, res) =>{
    const userId = req.user;
    // console.log("==> shoppingCartController.js: getShoppingCart");
    // console.log("req.user:",req.user);
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        // console.log("==>OK : getShoppingCart user.shoppingCart:",user.shoppingCart);
        res.status(200).json(user.shoppingCart);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//add an item to a user's shopping cart
const addItem = async (req, res) =>{
    // console.log("==> shoppingCartController.js: addItem",req.body);
    // console.log("req.user:",req.user);
    let userId;
    if(req.user){
        userId = req.user;
        // console.log("req.user:",req.user);
    }
    else {
        userId = req.body.userid;
        // console.log("req.body.userid:",req.body.userid);
    }
//   const {productId, name, imageURL, price,quantity} = req.body;//do not need parse all the fields. id can be used to find and render details on page
   const {productId, quantity} = req.body;//do not need parse all the fields. id can be used to find and render details on page

  try{
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }
    const product = await Product.findById(productId);//productId here must be mongodb id
    // const product = await Product.findOne({id: productId});//productId here must be mongodb id
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    // Check if the product is already in the cart
    const existingItemIndex = user.shoppingCart.findIndex(item => item.productId.toString() === productId);
    if (existingItemIndex > -1) {
      
        user.shoppingCart[existingItemIndex].productQuantity += quantity;
        if(user.shoppingCart[existingItemIndex].productQuantity<=0){
            
            // Remove the item from the cart
            // console.log("==>Remove the item from the cart, quantity<=0 :",user.shoppingCart[existingItemIndex].productQuantity);
            user.shoppingCart.splice(existingItemIndex, 1);
        }   
    } else {
        // Add new item to the cart
        // user.shoppingCart.push({ productId, name, imageURL, price, productQuantity: quantity});
        user.shoppingCart.push({ productId, productQuantity: quantity});
    }

    // Save the user with the updated cart
    await user.save();
    // console.log("==>OK : addItem user.shoppingCart:",user.shoppingCart);
    res.status(200).json(user.shoppingCart);
  }catch(err){ 
    // console.log("==>Err: addItem err:",err);
    res.status(500).json({message: err.message});
  }
}

//delete an item from a user's shopping cart
const deleteItem = async (req, res) =>{ 
    const userId = req.user._id;
    const productId = req.params.productId;
   
    
    try{
        const user = await User.findById(userId);
        if(!user){
        return res.status(404).json({message: 'User not found'});
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const existingItemIndex = user.shoppingCart.findIndex(item => item.productId.toString() === productId);
        if (existingItemIndex > -1) {
            // Remove the item from the cart
            user.shoppingCart.splice(existingItemIndex, 1);
        }
    
        // Save the user with the updated cart
        await user.save();
    
        res.status(200).json(user.shoppingCart);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//update an item in a user's shopping cart
const updateItem = async (req, res) =>{
    const userId = req.user._id;
    const productId = req.params.productId;
    const {quantity} = req.body;
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const existingItemIndex = user.shoppingCart.findIndex(item => item.productId.toString() === productId);
        if (existingItemIndex > -1) {
            // Update quantity if the product is already in the cart
            user.shoppingCart[existingItemIndex].productQuantity = quantity;
        }
    
        // Save the user with the updated cart
        await user.save();
    
        res.status(200).json(user.shoppingCart);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
//delete all items from a user's shopping cart
const deleteAllItems = async (req, res) =>{
    const userId = req.user;
    try{
     const user = await User.findById(userId);
     if(!user){
          return res.status(404).json({message: 'User not found'});
     }
     user.shoppingCart = [];
     await user.save();
     res.status(200).json(user.shoppingCart);

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {getShoppingCart, addItem, deleteItem, updateItem, deleteAllItems}