const express = require('express');
const router = express.Router();
const controller = require('./card.controller')
/* GET home page. */
router.get('/', controller.CartPage);

module.exports = router;
