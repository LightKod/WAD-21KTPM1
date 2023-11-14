const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const styles = [
    "/vendor/datatables/dataTables.bootstrap4.min.css"
  ];
  const scripts = [
    "/js/datatables/table-card.js",
    "/vendor/datatables/jquery.dataTables.min.js",
    "/vendor/datatables/dataTables.bootstrap4.min.js",
  ];
  res.render('admin/card', {layout: 'admin/layouts/layout', title: 'Cards', scripts: scripts, styles: styles});
});

router.get('/edit', function(req, res, next) {
  const styles = [
  ];
  const scripts = [
  ];
  res.render('admin/card-edit', {layout: 'admin/layouts/layout', title: 'Edit', scripts: scripts, styles: styles});
});

router.get('/add', function(req, res, next) {
  const styles = [
  ];
  const scripts = [
  ];
  res.render('admin/card-add', {layout: 'admin/layouts/layout', title: 'Add',scripts: scripts, styles: styles});
});

module.exports = router;
