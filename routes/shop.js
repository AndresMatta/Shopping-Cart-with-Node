const express = require("express");

const ProductController = require("../controllers/ProductController");
const ShopController = require("../controllers/ShopController");

const router = express.Router();

router.get("/", ShopController.index);
router.get("/cart", ShopController.getCart);
router.post("/cart", ShopController.postCart);
router.post("/cart-delete-item", ShopController.deleteCartItem);
router.get("/checkout", ShopController.getCheckout);
router.get("/orders", ShopController.getOrders);

router.get("/products", ProductController.index);
router.get("/products/:productId", ProductController.show);

module.exports = router;
