require("dotenv").config();
var openwhisk = require("openwhisk");
var fs = require("fs");
var randomWords = require("random-words");
const res = require("express/lib/response");

var ow = openwhisk();

async function listActions() {
  return ow.actions.list();
}

function getActionDetails() {
  ow.actions
    .get(name)
    .then((result) => {})
    .catch((err) => {
      console.error("failed to create action", err);
    });
}

function createAction(body) {
  const namespace = "cloudspace";
  const name = randomWords();
  const code = fs.readFileSync("test.js", { encoding: "utf8" });

  var action = Buffer.from(body, "utf-8").toString();
  ow.actions
    .update({
      name,
      action,
      annotations: { "web-export": true },
    })
    .catch((err) => {
      if (process.env.DEBUGLOG) {
        console.log(err);
      }
      throw "Error obtaining serverless function.";
    });
  return name;
}

// Create function
const create = async function (code) {
  const result = createAction(code);
  return result;
};

// Get its details
const details = async function (a, b) {
  const result = await getActionDetails();
};

async function list() {
  const result = await listActions();
  return result;
};

module.exports = { create, list };
