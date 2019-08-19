const Sequelize = require("sequelize/index");

const sequelize = new Sequelize("ecommerce", "root", "", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;
