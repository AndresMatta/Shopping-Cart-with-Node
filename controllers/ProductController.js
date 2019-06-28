const Product = require("../models/Product");

const index = (req, res, next) => {
  Product.all(products => {
    res.render("shop/product-list", {
      products: products,
      pageTitle: "All Products",
      path: "/products",
      hasProducts: products.length > 0
    });
  });
};

const getAdminProducts = (req, res, next) => {
  Product.all(products => {
    res.render("admin/products", {
      products: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      hasProducts: products.length > 0
    });
  });
};

const create = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

const store = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

const show = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, product => {
    res.render("shop/product-details", {
      product,
      pageTitle: "details",
      path: "/products"
    });
  });
};

const edit = (req, res, next) => {
  Product.findById(req.params.productId, product => {
    if (!product) return res.redirect("/404");
    res.render("admin/edit-product", {
      product,
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true
    });
  });
};

const update = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    price,
    description
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

const destroy = (req, res, next) => {
  Product.delete(req.body.productId);
  res.redirect("/admin/products");
};

module.exports = {
  index,
  create,
  store,
  show,
  edit,
  update,
  destroy,
  getAdminProducts
};
