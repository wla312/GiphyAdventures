// Giphy HW JS file

// create an array of strings with a common theme
var animals = ["cat", "dog", "otter"];

// function for displaying buttons for each string in the array
function renderButtons() {

	// empty the #animals div
	$("#animalButtons").empty();

// dynamically create buttons and display them in html
	for (var i = 0; i<animals.length; i++) {
		var themeButton = $("<button>");
		themeButton.text(animals[i]);
		themeButton.addClass("btn btn-primary");
		themeButton.attr("data-animal", animals[i]);
		$("#animalButtons").append(themeButton);
	}
}

// click event function for all buttons
 function displayGifs() {
 	// console.log("test");
 	
	// empty the #animals div
	$("#animals").empty();

	var animal = $(this).attr("data-animal");
	// test
	// console.log(animal);

	// // queryURL using the var animal value
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // AJAX request
    $.ajax({
    	url: queryURL,
    	method: "GET"
    })
    // after data comes back from AJAX request
    .done(function(response) {
    	// test
    	// console.log(queryURL);
    	// console.log(response);

    	// store the data from the AJAX request in variable
    	var results = response.data;
    	// test
    	// console.log(results);

		// dynamically create divs, p, and img tags for each piece of data from the AJAX request and add it to HTML
    	// loop through each data item in the results variable
    	for (var j = 0; j<results.length; j++) {

    		// create and store a div tag for each item
    		var dataDiv = $("<div>");

    		// create a p tag with each results item's rating
    		var p = $("<p>").text("Rating: " + results[j].rating);

    		// append the p tag to the dataDiv
    		dataDiv.append(p);

    		// create and store an image tag for each item
    		var dataImage = $("<img>");

    		// set the src attribute of the image to a property pulled from the data item
    		dataImage.attr("src", results[j].images.fixed_height_still.url);

    		// assign a class value to the image
    		dataImage.addClass("gif");

    		// assign a data-state attribute to the image
    		dataImage.attr("data-state", "still");

    		// assign a data-still and data-animate attribute to the image
    		dataImage.attr("data-still", results[j].images.fixed_height_still.url);
    		dataImage.attr("data-animate", results[j].images.fixed_height.url);

    		// append the image tag to the dataDiv
    		dataDiv.append(dataImage);

    		// append the dataDiv (and dynamically created p and img tags appended to it) to the #animals div
    		$("#animals").append(dataDiv);

    		// test
    		// console.log(dataDiv[0]);
    	}

    	// click event function for all img/gifs on the page
    	$(".gif").on("click", function() {

    		// create a variable named state, store the image's data-state
    		var state = $(this).attr("data-state");

    		// test
    		// console.log(state);

    		// check whether var state === still
    		// if it is...
    		if (state === "still") {
    			// change the src attribute to its data-animate value
    			$(this).attr("src", $(this).attr("data-animate"));
    			// change the data-state attribute to animate
    			$(this).attr("data-state", "animate");
    		}
    		// if it isn't...
    		else {
    			// change the src attribute to its data-still value
    			$(this).attr("src", $(this).attr("data-still"));
    			// change the data-state attribute to still
    			$(this).attr("data-state", "still");
    		}
    	})
    })
}

// function to push user input to the arry when user clicks submit
$("#addAnimal").on("click", function(event) {
	event.preventDefault();

	var animal = $("#animal-input").val().trim();
	// test
	// console.log(animal);
	animals.push(animal);
	// test
	// console.log(animals);

	// call the renderButtons function to display initial buttons + user input
	renderButtons();
})
// 
$(document).on("click", "button", displayGifs);

// display initial buttons
renderButtons();
