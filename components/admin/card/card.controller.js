const cardService = require("./card.service");
const service = require("./card.service");
const subTypeService = require("../../category/subtypes/subtypes.service");
const typeService = require("../../category/types/types.service");
const rarityService = require("../../category/rarities/rarities.service");

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

  const styles = ["/adminExtra/styles/card-edit.css"];
  const scripts = [
    "/adminExtra/scripts/image-drop.js",
    "/adminExtra/scripts/addcard.js",
  ];
  const subtypes = await subTypeService.GetAllSubtypes();
  const types = await typeService.GetAllTypes();
  const rarities = await rarityService.GetAllRarities();
  const card = await service.GetCard(id);
  res.render("admin/card-edit", {
    layout: "admin/layouts/layout",
    title: "Edit",
    scripts: scripts,
    styles: styles,
    card: card,
    subtypes: subtypes,
    types: types,
    rarities: rarities,
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

exports.CardUpload = async function (req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const file = req.file;
    console.log(req.body);
    // Sử dụng await để nhận URL trả về từ hàm uploadCard
    const imageUrl = await cardService.uploadCard(file);
    const updateCard = await cardService.updateCard(req.body, imageUrl);
    // Trả về URL của tệp tin đã tải lên
    console.log(updateCard);
    res.status(200).send(imageUrl);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file.");
  }
};
