const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/product-page');
})
router.get('/detail', function(req, res, next) {
  res.render('user/product-detail');
});

module.exports = router;
