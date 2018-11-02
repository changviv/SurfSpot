
// GOOGLE API
$(document).on("click", "#location-search", function(){
    $("#location-value").empty();
    // do I need a "this" here to refer to the button?
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=+El+Porto,+Manhattan+Beach,+CA&key=AIzaSyCqbqiyRQlrICB9lp-O0atY_4sGJ1QlAPI";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    // up to here is ajax call + object response
    // recorded value ex. below from API key above
	console.log(response.results[0].geometry.location.lat);
    console.log(response.results[0].geometry.location.lng);
    // grab value from location search input tag & store in var userLocation
    var userLocation = $("#location-search").val().trim();
    // create p tag to hold user location
    var p = $("<p>");
    // add class to p tag
    p.addClass("selected-location");
    // push userLocation value into p tag
    p.push(userLocation);
    
    });


//STORM GLASS API
    $.ajax({
        url: "https://api.stormglass.io/point?lat=58.5&lng=17.8",
        method: "GET",
        headers: { 'Authorization': "d3cc5276-dd5b-11e8-9e1f-0242ac130004-d3cc5424-dd5b-11e8-9e1f-0242ac130004"}
    }).then(function(response) {
        console.log(response.hours);
        console.log(response.hours[15].swellHeight);
    });
});