const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login', { layout: 'admin/layouts/simple-layout', title: 'Login'});
});

module.exports = router;
