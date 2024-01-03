const service = require("./dashboard.service");

exports.DashboardPage = async function (req, res, next) {
  const styles = ["/vendor/chart.js/Chart.min.js"];
  const scripts = [
    "/admin/vendor/chart.js/Chart.min.js",
    "/admin/js/demo/chart-area-demo.js",
    "/admin/js/demo/chart-pie-demo.js",
    "/adminExtra/scripts/dashboard.js",
  ];
  const data = await service.GetEarning(14);
  const topRevenue = await service.GetTopRevenue();
  const setRevenues = await service.GetTopSetRevenue();
  console.log(setRevenues);
  res.render("admin/dashboard", {
    layout: "admin/layouts/layout",
    title: "Dashboard",
    styles: styles,
    scripts: scripts,
    topRevenue: topRevenue,
    setRevenues: setRevenues,
  });
};

exports.GetEarning = async function (req, res, next) {
  const days = req.params.days || 14;

  try {
    const earningsData = await service.GetEarning(days);

    res.status(200).json({
      success: true,
      message: "Earnings data retrieved successfully",
      data: earningsData,
    });
  } catch (error) {
    console.error("Error in GetEarningController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.GetTotalEarning = async function (req, res, next) {
  const days = req.params.days || 14;

  try {
    const earningsData = await service.GetTotalEarning(days);

    res.status(200).json({
      success: true,
      message: "Earnings data retrieved successfully",
      data: earningsData,
    });
  } catch (error) {
    console.error("Error in GetEarningController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.GetTodayOrder = async function (req, res, next) {
  const days = req.params.days || 14;

  try {
    const earningsData = await service.GetTodayOrder(days);

    res.status(200).json({
      success: true,
      message: "Earnings data retrieved successfully",
      data: earningsData,
    });
  } catch (error) {
    console.error("Error in GetEarningController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.GetTopSetRevenue = async function (req, res, next) {
  try {
    const topSets = await service.GetTopSetRevenue();
    res.json(topSets);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
