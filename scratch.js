
var lat = response.results[0].geometry.location.lat;
var lon = response.results[0].geometry.location.lng;
// console.log("LAT: " + lat)
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
    headers: { 'Authorization': "d3cc5276-dd5b-11e8-9e1f-0242ac130004-d3cc5424-dd5b-11e8-9e1f-0242ac130004" }
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
        console.log("DAy One Wave HEIGHT: " + dayOneWaveHgt)
    }

        })
