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
		res.render("table", { array: result });
	});
});

app.get("/about", function (req, res) {
	res.render("about");
});

app.post("/delete_form/:name", function (req, res) {
	functions
		.remove(req.params.name)
		.then((result) => {
			res.redirect("/");
		})
		.catch((err) => {
			if (process.env.DEBUGLOG) {
				console.log(err);
			}
			res.redirect("/");
		});
});

app.get("/form", function (req, res) {
	res.render("serverless");
});

app.post("/post_form", function (req, res) {
	var code = req.body.code;
	var kind = req.body.function;
	functions.create(code, kind).then((result) => {
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
