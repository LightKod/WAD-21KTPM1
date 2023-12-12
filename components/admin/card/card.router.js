const express = require('express');
const router = express.Router();
const controller = require('./card.controller')

/* GET home page. */
router.get("/", controller.CardPage);
router.get("/edit/:id", controller.CardEditPage);
router.get("/add", controller.CardAddPage);

module.exports = router;
