var lat;
var lon;
var search;
// hide surf results when page loads
$("#surf-results").hide();

// when user searches for a location
$(document).on("click", "#location-search", function(event){
    // allow to use the enter button
    event.preventDefault();
    search = $("#location-input").val().trim();
    // call the google API
    googleSearch(search);

});


function googleSearch(search) {
    // empty the div so that it doesn't append old results
    $("#results").empty();
    // split the search by spaces and join them with plus signs in between
    search = search.split(" ").join("+")
    // make variable of the query search URL
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + search + "&key=" + google_key;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    // console.log(response);
    // empty the search value
    $("#location-input").val("");
    lat = response.results[0].geometry.location.lat;
    lon = response.results[0].geometry.location.lng;

    var formatAddress = response.results[0].formatted_address;
    // add formattedAddress text to current location div
    $("#current-location").text("Searching SurfSpot: " + formatAddress);
    // Gather data from StormGlass search
    stormGlassSearch(lat,lon);
    // render the map
    initMap(lat,lon);
    $("#surf-results").show();
});

function stormGlassSearch(latitude, longitude) {
    $.ajax({
        url: "https://api.stormglass.io/point?lat=" + latitude + "&lng=" + longitude,
        method: "GET",
        // headers: { 'Authorization': stormglass }
        // headers: { 'Authorization': stormglassTwo }
        // headers: { 'Authorization': stormglassThree }
        // headers: { 'Authorization': backup_sg_4 }
        headers: { 'Authorization': stormFive }

    }).then(function(response) {

        var optimalResponse = response.hours.slice(0,72);
            // console.log("RESPONSE", optimalResponse)

        var dayOne = optimalResponse.slice(0,24);
            // console.log("DAYS 1: ",  dayOne)

        var dayTwo = optimalResponse.slice(24,48);
            // console.log("DAYS 2: ", dayTwo)

        var dayThree = optimalResponse.slice(48,72);
            // console.log("DAYS 3: ", dayThree)

        for (var i = 0; i < 24; i++) {

            var dayOneResults = {
                Time: dayOne[i].time,
                AirTemp: dayOne[i].airTemperature[1].value,
                WaterTemp: dayOne[i].waterTemperature[1].value,
                WaveHeight: dayOne[i].waterTemperature[1].value,
                Visibility: dayOne[i].visibility[1].value,
                SwellHeight: dayOne[i].swellHeight[1].value,
                windSpeed: dayOne[i].windSpeed[1].value,
                windDirection: CDTD(dayOne[i].windDirection[1].value),
                waveDirection: CDTD(dayOne[i].waveDirection[1].value),
                precipitation:dayOne[i].precipitation[1].value,
            };

            dayOneResults = Object.values(dayOneResults)
            console.log(dayOneResults)
            // console.log(dayOneResults[0])
            var rowdata = $("<tr>");

            for (var j=0; j < dayOneResults.length; j++) {
                var tdata = $("<td>");

                tdata.append(dayOneResults[j])

                console.log(tdata)
                rowdata.append(tdata);
                $("tbody").append(rowdata)
            }

            // set you up to do day two and three//
            // var dayTwoResults = {
            //     AirTemp: dayTwo[i].airTemperature[1].value,
            //     WaterTemp: dayTwo[i].waterTemperature[1].value,
            //     WaveHeight: dayTwo[i].waterTemperature[1].value,
            //     Visibility: dayTwo[i].visibility[1].value,
            //     SwellHeight: dayTwo[i].swellHeight[1].value,
            //     windSpeed: dayTwo[i].windSpeed[1].value,
            //     windDirection: CDTD(dayTwo[i].windDirection[1].value),
            //     waveDirection: CDTD(dayTwo[i].waveDirection[1].value),
            //     precipitation:dayTwo[i].precipitation[1].value,
            // };

            // var dayThreeResults = {
            //     AirTemp: dayThree[i].airTemperature[1].value,
            //     WaterTemp: dayThree[i].waterTemperature[1].value,
            //     WaveHeight: dayThree[i].waterTemperature[1].value,
            //     Visibility: dayThree[i].visibility[1].value,
            //     SwellHeight: dayThree[i].swellHeight[1].value,
            //     windSpeed: dayThree[i].windSpeed[1].value,
            //     windDirection: CDTD(dayThree[i].windDirection[1].value),
            //     waveDirection: CDTD(dayThree[i].waveDirection[1].value),
            //     precipitation:dayThree[i].precipitation[1].value,
            // };

            // dayTwoResults = JSON.stringify(dayTwoResults);
            // dayThreeResults = JSON.stringify(dayThreeResults);
        //};

        };
    })
};


function initMap(latitude,longitude) {
  console.log("THIS MAP FUNCTION HAS BEEN CALLED")
  var myLatLng = {lat: latitude, lng: longitude};

  var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 13,
    center: myLatLng
  });

  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    draggable: true,
    title: 'SurfSpot Map!'
  });

  google.maps.event.addListener(marker, 'dragend', function (evt) {
    document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';

    var new_lon = marker.getPosition().lng();
    var new_lat = marker.getPosition().lat()
    // $("#tbody").empty();
    stormGlassSearch(new_lat,new_lon);

    myLatLng = {lat: new_lat, lng: new_lon};
    geocoder.geocode({'location': myLatLng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            map.setZoom(11);
            infowindow.setContent(results[0].formatted_address);
            $("#current-location").text("Searching SurfSpot: "+ results[0].formatted_address);
            infowindow.open(map, marker);
          } else {
            // window.alert('No results found');
          }
        } else {
          // window.alert('Geocoder failed due to: ' + status);
        }
    });
    console.log(marker.getPosition().lng());
    console.log(marker.getPosition().lat());
  });
};


function CDTD(x) {
    if (x > 5 && x < 85) {
        x = "NE"
    } else if (x < 175 && x > 95) {
        x = "SE"
    } else if (x > 185 && x < 265) {
        x = "SW"
    } else if (x < 355 && x > 275) {
        x = "NW"
    } else if ((x < 360 && x > 355) || (x > 0 && x < 5)) {
        x = "N"
    } else if (x < 95 && x > 85) {
        x = "E"
    } else if (x < 185 && x > 175) {
        x = "S"
    } else if (x < 275 && x > 265) {
        x = "W"
    }
    return x
}

};

