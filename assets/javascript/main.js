var google_api = google_key;
var sg_api = stormglass;

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

var lat = "";
var lon = "";

$.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=5000+Pacific+Coast+Hwy,+Pacifica,+CA&key=" + google_api,
    method: "GET",
}).then(function(response) {
	console.log(response)
	console.log(response.results[0].geometry.location.lat)
	console.log(response.results[0].geometry.location.lng)
})


//STORM GLASS API
$(document).ready(function() {

var lat = "";
var lon = "";


    $("#lat").on("click", function() {
        lat = prompt("lattitude:")
        
    });

    $("#lon").on("click", function() {
        lon = prompt("longitude:")
    });

    $("#btn1").on("click", function() {


$.ajax({
    //url: 'https://api.stormglass.io/point?lat=58.5&lng=17.8',
    url: "https://api.stormglass.io/point?lat=" + lat + "&lng=" + lon,
    method: "GET",
    //headers: { 'Authorization': "d3cc5276-dd5b-11e8-9e1f-0242ac130004-d3cc5424-dd5b-11e8-9e1f-0242ac130004" }
    headers: { 'Authorization': "dd5c9c48-de4f-11e8-9f7a-0242ac130004-dd5c9d4c-de4f-11e8-9f7a-0242ac130004" }
}).then(function(response) {
	//console.log(response)
    //console.log(response.hours)
    //console.log(response.hours[40].waterTemperature[1].value)
    


    var optimalResponse = response.hours.slice(0,72);
        //console.log(optimalResponse[50].waterTemperature[1].value)
        console.log(optimalResponse)

    var dayOne = optimalResponse.slice(0,24);
        console.log(dayOne)

    var dayTwo = optimalResponse.slice(24,48);
        console.log(dayTwo)

    var dayThree = optimalResponse.slice(48,72);
        console.log(dayThree)
        
    //var dayOneAirTmp = dayOne[0].airTemperature[1].value;
        //console.log(dayOneAirTmp)

    var DayOneAirTmp = []

    Object.keys(dayOne).forEach(function(key) {
        //get the value of name
        var val = dayOne[key]["airTemperature"];
        //push the name string in the array
        DayOneAirTmp.push(val);
      });
        console.log(DayOneAirTmp);

    var finalDay1AirTmp = []

    Object.keys(DayOneAirTmp).forEach(function(key) {
        //get the value of name
        var val = DayOneAirTmp[key]["1"];
        //push the name string in the array
        finalDay1AirTmp.push(val);
      });
        console.log(finalDay1AirTmp)



    $("#airTmp").html(finalDay1AirTmp);


		});
	});
});
