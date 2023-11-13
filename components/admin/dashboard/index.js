const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard', {layout: 'admin/layouts/layout', title: 'Dashboard'});
});

module.exports = router;
