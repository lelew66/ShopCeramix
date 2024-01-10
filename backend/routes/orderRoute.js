const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

const {getOrders,
     getOrder,
    createOrder, 
    deleteOrder, 
    updateOrder} 
    = require('../controllers/orderController');

router.use(requireAuth);
router.get('/', getOrders);
router.get('/:orderId', getOrder);
router.post('/', createOrder);
router.delete('/:orderId', deleteOrder);
router.patch('/:orderId', updateOrder);

module.exports = router;