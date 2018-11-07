var google_api = google_key;
var sg_api = stormglass;

// hide surf results when started
$("#surf-results").hide();

function initMap(latitude,longitude) {
  console.log("THIS MAP FUNCTION HAS BEEN CALLED")
  var myLatLng = {lat: latitude, lng: longitude};

  var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 13,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    draggable: true,
    title: 'SurfSpot Map!'
  });

  google.maps.event.addListener(marker, 'dragend', function (evt) {
    document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
    console.log(marker.getPosition().lng());
    console.log(marker.getPosition().lat());
  });
};

// GOOGLE API
$(document).on("click", "#location-search", function(event){
    event.preventDefault();
    var search = $("#location-input").val().trim();
    search = search.split(" ").join("+")
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=" + google_api;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    console.log(response);
    var formatAddress = response.results[0].formatted_address;

    // grab value from location search input tag & store in var userLocation
    // create p tag to hold user location
    var p = $("#current-location");
    $("#location-input").val("");
    // add class to p tag
    p.text("Searching SurfSpot: " + formatAddress);
    // push userLocation value into p tag
    $("#results").append(p);
    $("#surf-results").show();

//STORM GLASS API
    var lat = response.results[0].geometry.location.lat;
    var lon = response.results[0].geometry.location.lng;
    initMap(lat,lon);

    $.ajax({
        //url: 'https://api.stormglass.io/point?lat=58.5&lng=17.8',
        url: "https://api.stormglass.io/point?lat=" + lat + "&lng=" + lon,
        method: "GET",
        headers: { 'Authorization': "d3cc5276-dd5b-11e8-9e1f-0242ac130004-d3cc5424-dd5b-11e8-9e1f-0242ac130004" }
        //headers: { 'Authorization': "3163bc06-dfac-11e8-83ef-0242ac130004-3163bd00-dfac-11e8-83ef-0242ac130004" }
        //headers: { 'Authorization': "dd5c9c48-de4f-11e8-9f7a-0242ac130004-dd5c9d4c-de4f-11e8-9f7a-0242ac130004" }
    }).then(function(response) {



        var optimalResponse = response.hours.slice(0,72);
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


var lat = response.results[0].geometry.location.lat;
var lon = response.results[0].geometry.location.lng;
// console.log("LAT: " + lat)
//var lat = "";
//var lon = "";

            var dayOneWaveHgt = dayOne[i].swellHeight[1].value;
                //console.log("Day One Wave HEIGHT: " + dayOneWaveHgt)


            var dayOneVisibility = dayOne[i].visibility[1].value;
                //console.log("day one Visibility" + dayOneVisibility)

            var dayOneWndSpd = dayOne[i].windSpeed[1].value;
                //console.log("day one Wind SPeed" + dayOneWndSpd)

            var dayOneWndDir = dayOne[i].windDirection[1].value;
                //console.log(dayOneWndDir)

            var dayOneWvDir = dayOne[i].waveDirection[1].value;
                //console.log(dayOneWvDir)

            var dayOnePrecipitation = dayOne[i].precipitation[1].value;
                //console.log(dayOnePrecipitation)

            dayOneWndDir = CDTD(dayOneWndDir);
                //console.log("Wind Direction: " ,dayOneWndDir);
            dayOneWvDir = CDTD(dayOneWvDir);
                //console.log(dayOneWvDir)


            var dayTwoAirTmp = dayTwo[i].airTemperature[1].value;
                //console.log(dayTwoAirTmp)

            var dayTwoWtrTmp = dayTwo[i].waterTemperature[1].value;
                //console.log(dayTwoWtrTmp)

            var dayTwoWaveHgt = dayTwo[i].swellHeight[1].value;
                //console.log("DayyTwo Wave HEIGHT: " + dayTwoWaveHgt)

            var dayTwoVisibility = dayTwo[i].visibility[1].value;
                //console.log("dayyTwo Visibility" + dayTwoVisibility)

            var dayTwoWndSpd = dayTwo[i].windSpeed[1].value;
                //console.log("dayyTwo Wind SPeed" + dayTwoWndSpd)

            var dayTwoWndDir = dayTwo[i].windDirection[1].value;
                //console.log(dayTwoWndDir)

            var dayTwoWvDir = dayTwo[i].waveDirection[1].value;
                //console.log(dayTwoWvDir)

            var dayTwoPrecipitation = dayTwo[i].precipitation[1].value;
                //console.log(dayTwoPrecipitation)

            dayTwoWndDir = CDTD(dayTwoWndDir)
                //console.log(dayTwoWndDir)

            dayTwoWvDir = CDTD(dayTwoWvDir)
                //console.log(dayTwoWvDir)


            var dayThreeAirTmp = dayThree[i].airTemperature[1].value;
                //console.log(dayThreeAirTmp)

            var dayThreeWtrTmp = dayThree[i].waterTemperature[1].value;
                //console.log(dayThreeWtrTmp)

            var dayThreeWaveHgt = dayThree[i].swellHeight[1].value;
                //console.log("DayyThree Wave HEIGHT: " + dayThreeWaveHgt)

            var dayThreeVisibility = dayThree[i].visibility[1].value;
                //console.log("dayyThree Visibility" + dayThreeVisibility)

            var dayThreeWndSpd = dayThree[i].windSpeed[1].value;
                console.log("dayyThree Wind SPeed" + dayThreeWndSpd)

            var dayThreeWndDir = dayThree[i].windDirection[1].value;
                //console.log(dayThreeWndDir)

            var dayThreeWvDir = dayThree[i].waveDirection[1].value;
                //console.log(dayThreeWvDir)

            var dayThreePrecipitation = dayThree[i].precipitation[1].value;
                //console.log(dayThreePrecipitation)

            dayThreeWndDir = CDTD(dayThreeWndDir)
                //console.log(dayThreeWndDir)

            dayThreeWvDir = CDTD(dayThreeWvDir)
                //console.log(dayThreeWvDir)
        }

        }) //end of inner ajax call
    }); // end of first then
});  // end of on click

    function CDTD(x) {
        if (x > 5 && x < 85) {
            x = "NE"
        }
        else if (x < 175 && x > 95) {
            x = "SE"
        }
        else if (x > 185 && x < 265) {
            x = "SW"
        }
        else if (x < 355 && x > 275) {
            x = "NW"
        }
        else if (x > 355 && x < 5) {
            x = "N"
        }
        else if (x < 95 && x > 85) {
            x = "E"
        }
        else if (x < 185 && x > 175) {
            x = "S"
        }
        else if (x < 275 && x > 265) {
            x = "W"
        }

        return x
    }

