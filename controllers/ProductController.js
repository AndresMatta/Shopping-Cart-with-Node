const Product = require("../models/Product");

const index = (req, res, next) => {
  Product.all(products => {
    res.render("shop", {
      products: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

const show = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCss: true,
    productCss: true,
    activeAddProduct: true
  });
};

const store = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

module.exports = {
  index,
  show,
  store
};
