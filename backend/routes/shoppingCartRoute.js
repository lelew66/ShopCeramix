const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { getShoppingCart, 
        addItem, 
        deleteItem, 
        deleteAllItems, 
        updateItem 
      } = require('../controllers/shoppingCartController');

const router = express.Router();


router.use(requireAuth);
router.get('/',getShoppingCart);
router.post('/', addItem);
router.delete('/:productId', deleteItem);
router.delete('/', deleteAllItems);
router.patch('/:productId', updateItem);

module.exports = router;
