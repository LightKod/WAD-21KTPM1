const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/register', { layout: 'admin/layouts/simple-layout', title: 'Register'});
});

module.exports = router;
