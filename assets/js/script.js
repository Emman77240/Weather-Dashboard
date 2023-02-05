// Run JavaScript code when page is ready
$(document).ready(function () {
    localStorage.clear();
    let forecast;
    let myMoment;
    let btn = "<div class='my-3'><button class='btn btn-block' style='background-color: lightgray;'>My button</button></div>";
    let cityName = "London";

    for(let i = 1; i <= 6; i++) {
        $(".weather-hr").append(btn);
        $("#forecast").append(forecast);
        myMoment = moment().add(i, 'days').format('D/M/YYYY');
        forecast = "<div class='card text-white mb-3 ml-3' style='max-width: 12rem; background-color: #386398;'><div class='card-header'>" + myMoment + "</div><div class='card-body'><h5 class='card-title'>Dark card title</h5><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p></div></div>";

    }

    // Create instance of current day
    let currentDay = moment().format("D/M/YYYY");

    $("#city-name").text(cityName + " (" + currentDay + ")");
    getApi("London", currentDay);


});

// Get API data for the chosen city
function getApi(city, mmt) {
    
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=30ce6e4f534f3ead33ad2fcdac72658b";
    let coord = [];

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
        // Add coordinates to array
        coord.push(response.coord.lat);
        coord.push(response.coord.lon);
        
        // Define variables for html inputs
        let searchedCity = response.name;
        let searchedCityTemp = response.main.temp;
        let searchedCityHum = response.main.humidity;
        let searchedCityWind = response.wind.speed;
        let icon = response.weather[0].icon;
        $("#currentIcon").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
        $("#city-name").text(searchedCity + " (" + mmt + ")");
        $("#temperature").text("Temp: " + ((searchedCityTemp - 32) * (5 / 9)).toFixed(2) + "°C");
        $("#humidity").text("Humidity: " + searchedCityHum + "%");
        $("#wind-speed").text("Wind Speed: " + searchedCityWind + "mph");
      
    });
}






  