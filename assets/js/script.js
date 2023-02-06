

// Run JavaScript code when page is ready
$(document).ready(function () {
    
    // Instantiate variables
    // Define global variables
    let myLat;
    let myLon;
    let forecast;
    let myMoment;
    let history = [];
    let cityName = "London";
    let btn = "<div class='my-3'><button class='btn btn-block' style='background-color: lightgray;'>My button</button></div>";
    
    // Create instance of current day
    let currentDay = moment().format("D/M/YYYY");

    // Display default city weather
    $("#city-name").text(cityName + " (" + currentDay + ")");
    getWeather(cityName, currentDay);


    for(let i = 1; i <= 6; i++) {
        let val = i - 1;
        $("#forecast").append(forecast);
        myMoment = moment().add(i, 'days').format('D/M/YYYY');
        forecast = "<div class='card text-white my-3 mr-4 pr-4' style='max-width: 15rem; background-color: #386398;'><div class='card-header'>" + myMoment + "</div><div class='card-body'><img src='' alt='Weather Icon' id='currentIcon"+ val +"'><p class='current-info' id='temperature"+ val +"'></p><p class='current-info' id='wind-speed"+ val +"'></p><p class='current-info' id='humidity"+ val +"'></p></div></div>";
        

    }

    // Display forecast of default city
    getForecast(myLat, myLon);
            

});


// Get API data for the chosen city
function getWeather(city, mmnt) {
    // Define query string
    var coords = [];
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=30ce6e4f534f3ead33ad2fcdac72658b";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        // Set coordinates
        coords.push(response.coord.lat);
        coords.push(response.coord.lon);
        localStorage.setItem("lat", coords[0]);
        localStorage.setItem("lon", coords[1]);
        console.log(response);
        
        // Define variables for api response
        let searchedCity = response.name;
        let searchedCityTemp = response.main.temp;
        let searchedCityHum = response.main.humidity;
        let searchedCityWind = response.wind.speed;
        let icon = response.weather[0].icon;

        // Display response items on html page
        $("#city-name").text(searchedCity + " (" + mmnt + ")");
        $("#currentIcon").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
        $("#temperature").text("Temp: " + ((searchedCityTemp - 32) * (5 / 9)).toFixed(2) + "°C");
        $("#humidity").text("Humidity: " + searchedCityHum + "%");
        $("#wind-speed").text("Wind: " + searchedCityWind + " KPH");
  
    });

}



// Function that retrieves 5 day forecast
function getForecast(lat, lon) {
    // Retrieve location from local storage
    lat = localStorage.getItem("lat");
    lon = localStorage.getItem("lon");

    // Define query string
    let forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + "&units=imperial&appid=42d98d76405f5b8038f2ad71187af430"
    

    $.ajax({
        url: forecastUrl,
        method: "GET",
    }).then(function (response) {
    
        console.log(response);
        let myTemp = response.daily[0];
        console.log(myTemp); 

        // Add forecast to cards on page
        for(let i = 0; i < 5; i++) {
            // Define variables for html inputs
            let searchedCityTemp = response.daily[i].temp.day;
            let searchedCityHum = response.daily[i].humidity;
            let searchedCityWind = response.daily[i].wind_speed;
            let icon = response.daily[i].weather[0].icon;
    
            $("#currentIcon"+ i +"").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
            $("#temperature"+ i +"").text("Temp: " + ((searchedCityTemp - 32) * (5 / 9)).toFixed(2) + "°C");
            $("#wind-speed"+ i +"").text("Wind: " + searchedCityWind + " KPH")
            $("#humidity"+ i +"").text("Humidity: " + searchedCityHum + "%");

        }
       
    });
}


// Check local storage for stored cities and populate history section if there is
function getHistory(arr, myBtn) {
    // Check local storage for history
    if(localStorage.getItem(arr)) {
        let newHistory = localStorage.getItem(arr);
        for(let i = 0; i < newHistory.length; i++) {
            $("#history").append(myBtn).text(newHistory[i]);
        }
    } else {
        $("#search-button").click(function() {
            if($("search-input").value()) {
                let myInput = $("search-input").value();

                // Get weather forcast for requested city
                getApi(myInput, currentDay)
            }
        })
    }

}


