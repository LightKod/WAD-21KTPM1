const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/card', {layout: 'admin/layouts/layout', title: 'Cards'});
});

router.get('/edit', function(req, res, next) {
  res.render('admin/card-edit', {layout: 'admin/layouts/layout', title: 'Edit'});
});

router.get('/add', function(req, res, next) {
  res.render('admin/card-add', {layout: 'admin/layouts/layout', title: 'Add'});
});

module.exports = router;
