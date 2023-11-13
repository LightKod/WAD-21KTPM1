const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/user', {layout: 'admin/layouts/layout', title: 'User Management'});
});

module.exports = router;
