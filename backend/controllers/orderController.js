const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

//get all orders of a user
const getOrders =  async(req,res) =>{
    const userId = req.user._id;
    try{
        const orders = await Order.find({user: userId}).populate('items.product');
        res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

//get a signle order of a user
const getOrder = async (req, res) => {

    const userId = req.user._id;
    try {
        const orderId = req.params.orderId;
        
        const order = await Order.findOne({ _id: orderId, user: userId }).populate('items.product');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//create a new order for a user
const createOrder = async (req, res) => {
    const userId = req.user._id;
    try {
        const orderData = { ...req.body, user: userId };
        console.log(orderData);
        const newOrder = await Order.create(orderData);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//delete a order of a user
const deleteOrder = async (req, res)=>{
    const orderId = req.params.orderId;
    const userId = req.user._id;  
    try{ 
        const order = await Order.findOne({_id: orderId, user: userId});
        if(!order){
            return res.status(404).json({message: 'Order not found'});
        }
        await Order.findOneAndDelete(orderId);
        res.json({message: 'Order deleted successfully'});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

//update a order of a user
const updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const userId = req.user._id;

    try {
        const order = await Order.findOne({ _id: orderId, user: userId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        Object.assign(order, req.body);
        await order.save();

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {getOrders, getOrder, createOrder, deleteOrder, updateOrder}