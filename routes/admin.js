const express = require("express");

const ProductController = require("../controllers/ProductController");

const router = express.Router();

router.get("/add-product", ProductController.show);

router.post("/add-product", ProductController.store);

module.exports = router;
