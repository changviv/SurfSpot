var google_api = google_key;
var sg_api = stormglass;

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
		    url: "https://api.stormglass.io/point?lat=" + lat + "&lng=" + lon,
		    method: "GET",
		    headers: { 'Authorization': sg_api }
		}).then(function(response) {
			console.log(response)
		  console.log(response.hours)
			console.log(response.hours[4])
			console.log(response.hours[4].swellHeight)

		});
	});
});
