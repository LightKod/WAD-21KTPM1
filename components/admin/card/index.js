const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const styles = [
    "/admin/vendor/datatables/dataTables.bootstrap4.min.css",
    "/adminExtra/styles/card-list.css",
  ];
  const scripts = [
    "/admin/js/datatables/table-card.js",
    "/admin/vendor/datatables/jquery.dataTables.min.js",
    "/admin/vendor/datatables/dataTables.bootstrap4.min.js",
  ];
  res.render('admin/card', {layout: 'admin/layouts/layout', title: 'Cards', scripts: scripts, styles: styles});
});

router.get('/edit', function(req, res, next) {
  const styles = [
  ];
  const scripts = [
    "/adminExtra/scripts/image-drop.js",
  ];
  res.render('admin/card-edit', {layout: 'admin/layouts/layout', title: 'Edit', scripts: scripts, styles: styles});
});

router.get('/add', function(req, res, next) {
  const styles = [

  ];
  const scripts = [
    "/adminExtra/scripts/image-drop.js",
  ];
  res.render('admin/card-add', {layout: 'admin/layouts/layout', title: 'Add',scripts: scripts, styles: styles});
});

module.exports = router;
