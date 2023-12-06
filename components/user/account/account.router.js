const express = require('express');
const router = express.Router();
const controller = require('./account.controller')
/* GET account (orders) page. */
router.get('/', controller.AccountPage);
/* GET addresses page. */
router.get('/addresses', controller.AddressPage);  

module.exports = router;