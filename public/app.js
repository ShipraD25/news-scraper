$(document).ready(function() {
    $("#scrape").on("click", function() {
        event.preventDefault();
        $.ajax({
            url:"/api/scrape",
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
        url: "/api/article/save/" + id,
        method:"PUT"
    }).then(function() {
        location.reload()
    })
})

$(document).on("click","#shownotes", function () {
    event.preventDefault();
    console.log("viewnotes clicked")
    var id = $(this).attr("data-id");

    $.ajax({
        url: "/api/article/" + id,
        method:"GET"
    }).then(function(data) {
        console.log(data)
        $("#modalnote").find("#thenotes").empty();
        
        console.log(data.note)
//loop and show the notes if existing
    for (let i =0; i < data.note.length; i ++ ) {
        var title = data.note[i].title
        var comment = data.note[i].comment
        var idNote = data.note[i]._id

        let tempNote = `<div class="list-group-item list-group-item-action  mb-1">
        <div class="justify-content-between">
          <h5 class="mb-1">${title}</h5>
          <div class="row">
          <div class="col-11">
          <small>${comment}</small>
          </div>
          <div class="col-1">
          <button class="btn-sm btn-danger deletenote" data-toggle="modal" data-target="#modalnote" data-idNote="${idNote}" data-idArticle="${id}">X</button>
          </div>
        </div></div>`

        console.log(tempNote)

        $("#modalnote").find("#thenotes").append(tempNote);
    }
        let tempButton = (`<button class="btn-sm btn-success" id="savenote" data-toggle="modal" data-target="#modalnote" data-id="${data._id}">Add to Saved!</button>`)
      $("#modalnote").find("#buttonsaved").empty();
      $("#modalnote").find("#buttonsaved").append(tempButton);
      $("#modalnote").modal("show")
    })
});


$(document).on("click","#savenote", function () {
    console.log("savenote clicked")
    var id = $(this).attr("data-id");
    var title = $("#notetitle").val().trim();
    var comment = $("#notebody").val().trim();
     if (!title) {
         console.log("empty")
     }
     else {
    $.ajax({
        url: "/api/note/save/" + id,
        method:"POST",
        data: {
            title: title,
            comment: comment
        }
    }).then(function(data) {
        console.log(data)
        //location.reload()
    });
    $("#notetitle").val("");
    $("notebody").val("");
}
})

/* Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});*/
