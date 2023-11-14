const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const styles = [
    "/vendor/chart.js/Chart.min.js"
  ];
  const scripts = [
    "/vendor/chart.js/Chart.min.js" ,
    "/js/demo/chart-area-demo.js",
    "/js/demo/chart-pie-demo.js",
  ];
  res.render('admin/dashboard', {layout: 'admin/layouts/layout', title: 'Dashboard',
  styles: styles,
  scripts: scripts,
},
  );
});

module.exports = router;
