var latitude
var longitude
var arriveName
var closestStation
// TESTS

var successBike = function(objectOfInfo) {
	var templateFunction = Handlebars.compile( $("#bikeshareTemplate").html())

	//_.each(objectOfInfo, function(bikes) {
		var htmlString = templateFunction(objectOfInfo)
		$(".bikeshare-container").append(htmlString)
	//})
	
}

var successStation = function(objectOfInfo) {
	var templateFunction = Handlebars.compile( $("#wmataStationTemplate").html())
	var htmlString = templateFunction(objectOfInfo)

	$(".wmataStation-container").append(htmlString)
}

var successTrain = function(objectOfInfo) {
	var templateFunction = Handlebars.compile( $("#wmataTrainTemplate").html())

	_.each(objectOfInfo, function(train) {

		var htmlString = templateFunction(train)
		$(".wmataTrain-container").append(htmlString)
	})
	
}

var bikeTest = {
	bId: 1,
	bName: "18th and M St NW",
	bBikes: 10,
	bDocks: 5
}

var stationTest = {
	Name: "Farragut West"
}

var trainTest = [
	{
		lineColor: "OR",
		destName: "Vienna",
		carName: 6,
		min: 2
	},

	{
		lineColor: "SV",
		destName: "Wiehle-Reston",
		carName: 8,
		min: 4
	}
]

// End TESTS

var currentLoc = function(){
	navigator.geolocation.getCurrentPosition(function(position) {

		latitude = position.coords.latitude
		longitude = position.coords.longitude

		bikeshare()
		wmataStation()
	})
}

var bikeshare = function() {
	$.ajax({
		url: "https://42d27812.ngrok.com/bikeshare",
		method: "GET",
		data: {
			latitude: latitude,
			longitude: longitude
		},
		success: function(bikeInfo) {

			$(".bikeshare-container").text("")

			_.each(bikeInfo, function(bikeStuff) {
				_.each(bikeStuff, function(bike) {

					var templateFunction = Handlebars.compile( $("#bikeshareTemplate").html())
					var htmlString = templateFunction(bike)

					$(".bikeshare-container").append(htmlString)
				})
			})
			
		} 
	})
}

var wmataStation = function() {
	$.ajax({
		url: "https://42d27812.ngrok.com/stationLocation",
		method: "GET",
		data: {
			latitude: "38.901",
			longitude: "-77.040"
		},
		success: function(stnInfo) {
			$(".wmataStation-container").text("")

			_.each(stnInfo, function(train){

				var templateFunction = Handlebars.compile( $("#wmataStationTemplate").html())
				var htmlString = templateFunction(train)

				$(".wmataStation-container").append(htmlString)

				wmataTrain(train.Code)
			})			
		} 
	})
}

var wmataTrain = function(closestStation) {
	$.ajax({
		url: "https://42d27812.ngrok.com/trainRealTime",
		method: "GET",
		data: {
			closestStation: closestStation
		},
		success: function(stnInfo) {
			$(".wmataTrain-container").text("")

			_.each(stnInfo, function(trains) {

				_.each(trains, function(train) {
					var templateFunction = Handlebars.compile( $("#wmataTrainTemplate").html())
					var htmlString = templateFunction(train)

					$(".wmataTrain-container").append(htmlString)
				})

				
			})
		}
	})
}



$(document).on("ready", function() {
	currentLoc()

	var transit = function() {
		currentLoc()
		console.log("hi")
	}

	setInterval(transit, 10000)

/*
	successBike(bikeTest)
	successStation(stationTest)
	successTrain(trainTest)
*/
})