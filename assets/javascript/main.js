var google_api = google_key;
var sg_api = stormglass;

// GOOGLE API
$(document).on("click", "#location-search", function(){
    $("#location-value").empty();
    // do I need a "this" here to refer to the button?
    var search = $("#location-input").val().trim();
    search = search.split(" ");
    search = search.join("+")
    console.log(search)
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=" + google_api;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    // up to here is ajax call + object response
    // recorded value ex. below from API key above
		console.log(response.results[0].geometry.location.lat);
    console.log(response.results[0].geometry.location.lng);
    // grab value from location search input tag & store in var userLocation

    // create p tag to hold user location
    var p = $("<p>");
    // add class to p tag
    p.text(search);
    console.log(p)
    // push userLocation value into p tag
    $("#surf-results").append(p);


//STORM GLASS API

    var lat = response.results[0].geometry.location.lat;
    var lon = response.results[0].geometry.location.lng;
    console.log("LAT: " + lat)
    //var lat = "";
    //var lon = "";


    // $("#lat").on("click", function() {
    //     lat = prompt("lattitude:")


    // });

    // $("#lon").on("click", function() {
    //     lon = prompt("longitude:")
    // });


    $.ajax({
        //url: 'https://api.stormglass.io/point?lat=58.5&lng=17.8',
        url: "https://api.stormglass.io/point?lat=" + lat + "&lng=" + lon,
        method: "GET",
        //headers: { 'Authorization': "d3cc5276-dd5b-11e8-9e1f-0242ac130004-d3cc5424-dd5b-11e8-9e1f-0242ac130004" }
        headers: { 'Authorization': "3163bc06-dfac-11e8-83ef-0242ac130004-3163bd00-dfac-11e8-83ef-0242ac130004" }
        //headers: { 'Authorization': "dd5c9c48-de4f-11e8-9f7a-0242ac130004-dd5c9d4c-de4f-11e8-9f7a-0242ac130004" }
    }).then(function(response) {
        //console.log(response)
        //console.log(response.hours)
        //console.log(response.hours[40].waterTemperature[1].value)



        var optimalResponse = response.hours.slice(0,72);
            //console.log(optimalResponse[50].waterTemperature[1].value)
            console.log("RESPONSE", optimalResponse)

        var dayOne = optimalResponse.slice(0,24);
            console.log("DAYS 1: ",  dayOne)

        var dayTwo = optimalResponse.slice(24,48);
            console.log("DAYS 2: ", dayTwo)

        var dayThree = optimalResponse.slice(48,72);
            console.log("DAYS 3: ", dayThree)

        for (var i = 0; i < 24; i++) {

            var dayOneAirTmp = dayOne[i].airTemperature[1].value;
                //console.log(dayOneAirTmp)

            var dayOneWtrTmp = dayOne[i].waterTemperature[1].value;
                //console.log(dayOneWtrTmp)

            var dayOneWaveHgt = dayOne[i].swellHeight[1].value;
                //console.log("Day One Wave HEIGHT: " + dayOneWaveHgt)

            var dayOneVisibility = dayOne[i].visibility[1].value;
                //console.log("day one Visibility" + dayOneVisibility)

            var dayOneWndSpd = dayOne[i].windSpeed[1].value;
                //console.log("day one Wind SPeed" + dayOneWndSpd)

            var dayOneWndDir = dayOne[i].windDirection[1].value;
                //console.log(dayOneWndDir)

            var dayOnePrecipitation = dayOne[i].precipitation[1].value;
                //console.log(dayOnePrecipitation)



            dayOneWndDir = CDTD(dayOneWndDir);
            console.log("this" ,dayOneWndDir)

            // var north = 0;
            // var east = 90;
            // var south = 180;
            // var west = 270;

            // var northEast = 0
                
        }





        }) //end of inner ajax call
    }); // end of first then
});  // end of on click
    function CDTD(dayOneWndDir) {
        if (dayOneWndDir > 0 && dayOneWndDir < 90) {
            dayOneWndDir = "NE"
        }
        else if (dayOneWndDir < 180 && dayOneWndDir > 90) { 
            dayOneWndDir = "SE"
        }
        else if (dayOneWndDir > 180 && dayOneWndDir < 270) {
            dayOneWndDir = "SW"
        }
        else if (dayOneWndDir < 360 && dayOneWndDir > 270) {
            dayOneWndDir = "NW"
        }

        return dayOneWndDir 
    }