// Our scraping tools

var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
// Require all models
var db = require("../models");

var router = express.Router();

router.get("/", function (req, res) {
    db.Article.find({})
    .populate("notes")
    .then(function (dbArticle) {
        var hbsObject = {
            articles: dbArticle
        }
        res.render("index", hbsObject)
    })
    .catch(function (err) {
        res.render("index");
    })
    
});

router.get("/save", function (req, res) {
    db.Article.find({})
    .populate("notes")
    .then(function (dbArticle) {
        var hbsObject = {
            articles: dbArticle
        }
        res.render("savearticle", hbsObject)
    })
    .catch(function (err) {
        res.render("savearticle");
    })
    
});

router.get("/api/scrape", function(req, res) {

    // First, we grab the body of the html with axios
    axios.get("https://www.buzzfeednews.com/").then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("main li").each(function(i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .children("span")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        // Send a message to the client
        res.redirect("/");
    });
});



router.put("/api/article/save/:id", function(req,res) {
    
    db.Article.findOneAndUpdate({_id: req.params.id}, {$set:{saved : true} })
    .then(function(dbArticle) {
       res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err)
    })
});

router.get("/api/article/:id", function (req, res){
    db.Article.findOne({_id: req.params.id}).populate("note")
    .then(function (dbArticle) {
       
        res.json(dbArticle)
    })
    .catch(function (err) {
        res.json(err);
    })
})
// Route for saving/updating an Article's associated Note
router.post("/api/note/save/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    //let counternotes = 0
    db.Note.create(req.body)
        .then(function(dbNote) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id },{$push: { note: dbNote._id }}, { new: true });
        })
        .then(function(dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

router.delete("/api/note/delete/:id", function(req, res){
    db.Note.findOneAndDelete({_id: req.params.id})
    .then(function (dbNote) {
        res.json(dbNote)
    })
    .catch(function(err) {
        res.json(err);
    });
});

module.exports = router;