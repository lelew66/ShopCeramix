const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {type:Number,unique:true ,required:true},
    name: {type:String, unique:true, required:true},
    category:{
        type: String, 
        required: true,
        default: 'Tableware', 
        enum: [ 'Decor', 'Drink', 'Tableware']},
    description: {type:String, required:true},
    included: {type:[String], required:true},
    price: {type:Number, required:true},
    imageURL: {type:[String], required:true},
    quantity: {type:Number, required:true},
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
  
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },

});

module.exports = mongoose.model('Product', productSchema);