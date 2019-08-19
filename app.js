const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const connection = require("./utils/database");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/404" });
});

connection
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
