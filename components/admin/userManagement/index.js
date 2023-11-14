const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const styles = [
    "/vendor/datatables/dataTables.bootstrap4.min.css",
    "/styles/table.css"
  ];
  const scripts = [
    "/js/table.js",
    "/js/datatables/table-card.js",
    "/vendor/datatables/jquery.dataTables.min.js",
    "/vendor/datatables/dataTables.bootstrap4.min.js",
  ];
  res.render('admin/user', {layout: 'admin/layouts/layout', title: 'User Management',scripts: scripts, styles: styles});
});

module.exports = router;
