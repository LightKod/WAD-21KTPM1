const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query)
  // res.send('congratulate')
  res.render('user/product-page');
})
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
