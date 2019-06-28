const express = require("express");

const ProductController = require("../controllers/ProductController");

const router = express.Router();

router.get("/products", ProductController.getAdminProducts);
router.get("/add-product", ProductController.create);
router.post("/add-product", ProductController.store);
router.get("/edit-product/:productId", ProductController.edit);
router.post("/edit-product", ProductController.update);
router.post("/delete-product", ProductController.destroy);

module.exports = router;
