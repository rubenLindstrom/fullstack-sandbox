"use strict";
var cors = require("cors");
var express = require("express");
var app = express();
app.use(cors());
var PORT = 3001;
app.get("/", function (req, res) { return res.send("Hello World!"); });
app.listen(PORT, function () { return console.log("Example app listening on port " + PORT + "!"); });
