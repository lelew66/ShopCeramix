const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) =>{
    //verify authentication

    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'});
    }
//authorization format : 'Bearer xxxxxxx'; xxxx is the token 
  const token = authorization.split(' ')[1];

  try{
   const {_id} =  jwt.verify(token, process.env.SECRET);
   req.user = await User.findOne({_id}).select('_id');
   next();
  }
  catch(error){
     console.log(error);
     res.status(401).json({error: 'Request is not authorized'})
  }


}

module.exports = requireAuth;
//will import and use this middleware (router.use(requireAuth)) for the routes which need to be protected later, 
//ex. OrderRecord; ShoppingCart(addItem,deleteItem)...