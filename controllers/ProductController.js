const Product = require("../models/Product");

const index = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/product-list", {
        products,
        pageTitle: "Products",
        path: "/products"
      });
    })
    .catch(err => console.log(err));
};

const getAdminProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("admin/products", {
        products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => console.log(err));
};

const create = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

const store = async (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  try {
    await Product.create({ title, price, imageUrl, description });
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};

const show = (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then(product => {
      res.render("shop/product-details", {
        product,
        pageTitle: `${product.title} - Details`,
        path: "/products"
      });
    })
    .catch(err => console.log(err));
};

const edit = (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then(product => {
      if (!product) return res.redirect("/404");
      res.render("admin/edit-product", {
        product,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: true
      });
    })
    .catch(err => console.log(err));
};

const update = async (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  try {
    const product = await Product.findByPk(productId);
    product.title = title;
    product.imageUrl = imageUrl;
    product.price = price;
    product.description = description;
    await product.save();
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await Product.destroy({ where: { id: req.body.productId } });
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
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
