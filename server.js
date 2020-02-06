var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
// Require all models
//var db = require("./models");

var PORT = 3000
    // Initialize Express
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scraperdata", { useNewUrlParser: true });

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});