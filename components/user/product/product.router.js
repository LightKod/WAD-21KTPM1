const express = require('express');
const router = express.Router();
const ProductController = require('./product.controler');
/* GET home page. */
router.get('/', ProductController.getProducts);
router.get('/search', ProductController.getProductsBySearch);
router.get('/detail', function(req, res, next) {
  const scripts = [
    '/scripts/product-detail.js',
  ];
  const styles = [
    "/styles/product-detail.css"
  ];

  res.render('user/product-detail', 
  {
    layout: 'user/layouts/layout', 
    title: "Your Shopping Cart",
    scripts: scripts,
    styles: styles,
  });
});

module.exports = router;
