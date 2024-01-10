const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/productModel');
const { getShoppingCart,
    addItem,
    deleteItem,
    deleteAllItems,
    updateItem
} = require('../controllers/shoppingCartController');
const User = require('../models/userModel');


const storeItems = new Map([
    [1, { priceInCents: 10000, name: 'Learn React Today' }],
    [2, { priceInCents: 20000, name: 'Learn CSS Today' }],
]);


router.post('/', async (req, res) => {
    const userId = req.body.userid;
    let items = [];
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const cart = user.shoppingCart;
        console.log("cart:", cart);
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            const product = await Product.findById(item.productId);
            items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name
                    },
                    unit_amount: parseInt(product.price * 100)
                },
                quantity: item.productQuantity
            });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    try {
        console.log("items:", items);
        const session = await stripe.checkout.sessions.create({
            //  success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            //  cancel_url: 'http://localhost:3000/cancel',
            success_url: `${process.env.CLIENT_URL}/orderconfirmation?sta=success`,
            cancel_url: `${process.env.CLIENT_URL}/orderconfirmation?stacancel`,
            //success_url: `http://localhost:4000/checkout/result?sta=success`,
            //cancel_url: `http://localhost:4000/checkout/result?stacancel`,
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items
        });
        console.log(session);
        res.json({ url: session.url });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
    // res.json({url: "session.url"});
});

router.get('/result', async (req, res) => {
    const sta = req.query.sta;
    console.log("payment sta:", sta);

    //TODO:create order
    //router.post('/', createOrder);

    // jump to client page
    res.redirect(`${process.env.CLIENT_URL}/orderconfirmation?sta=${sta}`);

});

module.exports = router;