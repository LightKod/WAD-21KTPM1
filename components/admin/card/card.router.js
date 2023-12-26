const express = require("express");
const router = express.Router();
const controller = require("./card.controller");
const multer = require("multer");
const multerStorage = multer.memoryStorage();
const multerUpload = multer({ storage: multerStorage });

/* GET home page. */
router.get("/", controller.CardPage);
router.get("/edit/:id", controller.CardEditPage);
router.get("/add", controller.CardAddPage);
router.post("/upload", multerUpload.single("image"), controller.CardUpload);
module.exports = router;
