const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({  
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: Number,
        price: Number,
        
    }],
      total: Number,
      status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Shipped']

    } 
  
},{timestamps:true});



const  Order = mongoose.model('Order', orderSchema);
module.exports = Order;