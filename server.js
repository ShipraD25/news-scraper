var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000
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

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoscrapper";
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
