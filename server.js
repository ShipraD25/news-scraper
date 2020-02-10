var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = 3000
    // Initialize Express
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Make public a static folder
app.use(express.static("public"));

var routes = require("./controllers/routes");
app.use(routes);
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoscraper", { useNewUrlParser: true });



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
