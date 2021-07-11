const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function (req, res) {
  return res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/catalog/products", function (req, res) {
  var products = {
    name: "First Product",
    description: "First Description",
  };
  return res.json(products);
});

app.listen(4300, function (server) {
  console.log("server started on port 4300");
  console.log(path.join(__dirname, "dist", "index.html"));
});
