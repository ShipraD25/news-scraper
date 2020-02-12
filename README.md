# news-scraper
This is a web app that displays news articles and allows the user to save it, add notes to it and delete notes if they would like. I have used Buzzfeed news for scraping.
### App-Demo
![app-demo](https://media.giphy.com/media/eKTzXSVhZulqh1C2vl/giphy.gif)

### Technolgy used
***Backend***
- Nodejs
- MongoDb
- Npm packages: 
- **express** 
- **express-handlebars**
- **axios**
- **cheerio**
- **mongoose**
- Heroku for deployment

***Frontend***
- HTML
- Javascript
- CSS
- Libraries
 **Jquery**
 **Bootstrap**


 ### Code Snippet 
Server side code that I have for scrapping the articles from Buzzfeed news and then updating the database after getting the articles.

 ```
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


 ```
# Heroku link - 
https://still-ocean-09388.herokuapp.com/