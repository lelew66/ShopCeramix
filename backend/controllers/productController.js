const Product = require('../models/productModel');

//get all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
}

//get a single product
const getProduct = async (req, res) => {
    // const productId = req.params.id;
    const productId =  req.query.id;
    console.log("getProduct by Id:", productId);
  try{

    const product = await Product.findOne({id: productId});

      if(!product){
        return res.status(404).json({message: 'Product not found'});
      }
  
    
    res.status(200).json(product);  

  }catch(err){
    res.status(500).json({message: err.message});
  }
}

const getProductByMongoId = async (req, res) => {
  // const productId = req.params.id;
  const productId =  req.query.id;
  console.log("getProduct by Id:", productId);
try{
  const product = await Product.findOne({_id: productId});

  if(!product){
    res.status(404).json({message: 'Product not found'});
  }
  res.status(200).json(product);

}catch(err){
  res.status(500).json({message: err.message});
}
}

const getProductByType = async (req, res) => {
    const productType = req.query.type;
    console.log("-->getProductByType:", productType);
  try{
    const products = await Product.find({category: productType});

    if(!products){
      res.status(404).json({message: 'Product not found'});
    }
    res.status(200).json(products);

  }catch(err){
    res.status(500).json({message: err.message});
  }
}

//create a new product
const createProduct = async (req, res) =>{
    
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

//delete a product
const deleteProduct = async (req, res) =>{
    const productId = req.params.id;
    try{
        const product = await Product.findOneAndDelete({id: productId});
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);

    }catch(err){
        res.status(500).json({message:err.message});
    }
}

//update a product
const updateProduct = async (req, res) =>{
    const prodcutId = req.params.id;
    try{
        const updatedProduct = await Product.findOneAndUpdate({id: prodcutId},{
        ...req.body
        }, {new: true})
       
        if(!updatedProduct){
            return res.status(404).json({message: 'Product not found'});
        }

        res.status(200).json(updatedProduct);
        
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductByType,
    getProductByMongoId
}