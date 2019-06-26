const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = callback => {
  fs.readFile(p, (err, data) => {
    if (err) return callback([]);

    callback(JSON.parse(data));
  });
};

class Product {
  constructor(title) {
    this.title = title;
  }

  static all(callback) {
    getProductsFromFile(callback);
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }
}

module.exports = Product;
