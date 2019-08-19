const Product = require("../models/Product");
const Cart = require("../models/Cart");

const index = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render("shop/index", {
        products,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(err => console.log(err));
};

const getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.all(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ ...product, quantity: cartProductData.quantity });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts
      });
    });
  });
};

const postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, product => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect("/cart");
};

const deleteCartItem = (req, res, next) => {
  Product.findById(req.body.productId, product => {
    Cart.deleteProduct(product.id, product.price);
    res.redirect("/cart");
  });
};

const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders"
  });
};

const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};

module.exports = {
  index,
  getCart,
  getCheckout,
  getOrders,
  postCart,
  deleteCartItem
};
