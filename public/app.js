$(document).ready(function() {
    $("#scrape").on("click", function() {
        $.ajax({
            url:"api/scrape",
            method: "GET"
        }).then(function() {
            location.reload()
        })
    })
})

$(document).on("click",".saveButton", function () {
    console.log("save clicked")
    var id = $(this).attr("data-id");

    $.ajax({
        url: "api/article/save" + id,
        methode:"PUT"
    }).then(function() {
        location.reload()
    })
})


/* Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});*/
