const { response } = require("express");
const express = require("express");
const path = require("path");
const functions = require("./function.js");

var app = express();

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

// To tell express that we are going to use EJS
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  functions.list().then((result) => {
    let array = [];
    result.forEach((element) => {
      array.push(element.name);
    });
    res.send(array);
  });
});

app.get("/about", function (req, res) {
  res.send("This is the about page.");
});

app.get("/ejs/:name", function (req, res) {
  res.render("ejs", { data: req.params.name });
});

app.get("/form", function (req, res) {
  res.render("serverless");
});

app.post("/post_form", function (req, res) {
  var code = req.body.code;
  var answer = functions.create(code).then((result) => {
    if (result === -1) {
      res.send("An error occurred.");
    } else {
      res.render("ejs", {
        link_name: result,
        api_host: process.env.__OW_API_HOST,
      });
    }
  });
});

app.listen(process.env.PORT);
