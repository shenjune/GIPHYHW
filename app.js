$(document).ready(function() {
// Here we are establishing a string of animals to start. 
  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];

//Here we are establishing a function that will allow us to populate buttons on the page. 
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

//we created a for loop to read through the array
    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }
//Here we are establishing the animal button to display on the page.
  $(document).on("click", ".animal-button", function() {
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");

  //here we are creating an variable attribute and we are building the URL we need to query the database 
    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  // Performing GET requests to the GIPHY API and logging the responses to the console 
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
        console.log(response);

  //for loop to read through the empty array that will be our results (user input)
        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class=\"animal-item\">");

          var rating = results[i].rating;

    //creating an html element, paragraph tag, to display on document
          var p = $("<p>").text("Rating: " + rating);

    //establishing size parameters for the giphy states (animated and still)
          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

    //here we are setting the giphy states (animate and still) for the document      
          var animalImage = $("<img>");
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          animalImage.attr("data-animate", animated);
          animalImage.attr("data-state", "still");
          animalImage.addClass("animal-image");

    //appending to the document
          animalDiv.append(p);
          animalDiv.append(animalImage);

          $("#animals").append(animalDiv);
        }
      });
  });
//created an on-click function that allows the user to see the giphy results when they press the animal button. 
  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");
// Here we use this method to set/return attributes and values of the still images. Once the giphy is on the document, it is in a still state. If user clicks on it, the giphy becomes active. If the user clicks on the active giphy, it reverts back to the still state. 
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

//created an on click function to create the user inputs into a button
  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();

  //here we are adding items to the end of the array if greater than 2. 
    if (newAnimal.length > 2) {
      animals.push(newAnimal);
    }
  //we are populating buttons onto the page. 
    populateButtons(animals, "animal-button", "#animal-buttons");

  });

//this one I do not know as it is the same as above? 
  populateButtons(animals, "animal-button", "#animal-buttons");
});
