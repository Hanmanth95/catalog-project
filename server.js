const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const { uuid } = require("uuidv4");
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));

app.post("/login", function (req, res) {
  console.log("login called");
  console.log(req.body);
  req.body.token = uuid();
  return res.json(req.body);
});

var productsList = [];

app.get("/catalog/products", function (req, res) {
  console.log("getAllProducts called");
  console.log(req.params);
  return res.send(productsList);
});

app.post("/catalog/product", function (req, res) {
  console.log("getAllProducts called");
  console.log(req.body);
  var count = 0;
  if (productsList.length > 0) {
    for (var i = 0; i < productsList.length; i++) {
      if (productsList[i].orderNo == req.body.orderNo) {
        count++;
        productsList.splice(i, 1);
        productsList.push(req.body);
      }
      if (i == productsList.length - 1 && count == 0) {
        productsList.push(req.body);
      }
    }
  } else {
    productsList.push(req.body);
  }
  return res.send(productsList);
});

app.delete("/catalog/product/:id", function (req, res) {
  var orderNo = req.params.id;
  for (var i = 0; i < productsList.length; i++) {
    if (productsList[i].orderNo == orderNo) {
      productsList.splice(i, 1);
    }
  }
  return res.send(productsList);
});

app.get("*", function (req, res) {
  return res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(4300, function () {
  console.log("server started on port 4300");
  console.log(path.join(__dirname, "dist", "index.html"));
});
