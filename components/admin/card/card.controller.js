const service = require('./card.service')

exports.CardPage = async function (req, res, next) {
  const styles = [
    "/admin/vendor/datatables/dataTables.bootstrap4.min.css",
    "/adminExtra/styles/card-list.css",
  ];
  const scripts = [
    "/admin/js/datatables/table-card.js",
    "/admin/vendor/datatables/jquery.dataTables.min.js",
    "/admin/vendor/datatables/dataTables.bootstrap4.min.js",
  ];
  const products = await service.GetAllCards();
  res.render("admin/card", {
    layout: "admin/layouts/layout",
    title: "Cards",
    scripts: scripts,
    styles: styles,
    products: products,
  });
};


exports.CardEditPage = async function (req, res, next) {
  const id = req.params.id;
  const styles = [];
  const scripts = ["/adminExtra/scripts/image-drop.js"];
  const card = await service.GetCard(id);
  res.render("admin/card-edit", {
    layout: "admin/layouts/layout",
    title: "Edit",
    scripts: scripts,
    styles: styles,
    card: card,
  });
};


exports.CardAddPage = function (req, res, next) {
  const styles = [];
  const scripts = ["/adminExtra/scripts/image-drop.js"];
  res.render("admin/card-add", {
    layout: "admin/layouts/layout",
    title: "Add",
    scripts: scripts,
    styles: styles,
  });
};