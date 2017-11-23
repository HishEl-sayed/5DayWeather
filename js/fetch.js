'use strict';

//the following IIFE fetches the data from the open weather API and appends the resulting data to the users browser

(function() {

    getData('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=07c942ac99d05229807385fde0045886') //grab the weather data
        .then(function(weatherData) {
            return processWeatherData(weatherData);
        })
        .then(function(processedWeatherData) {
            return appendData(processedWeatherData);
        })
        .catch(error); // if the request to the API fails then catch and run the error function.

    function getData(url) {

        return new Promise(function (resolve, reject) {

            var request = new XMLHttpRequest();

            // keep track of the request
            request.onreadystatechange = function() { //when the request is fired

                // check if the response data is sent back to me
                if(request.readyState === 4) {  // request finished and response is ready
                    if(request.status === 200) { // response is OK
                        resolve(JSON.parse(request.responseText)); // end the request and convert the returned string to JSON data
                    } else {
                        // otherwise display an error message
                        reject(new Error('An error occurred during your request: ' +  request.status + ' ' + request.statusText));
                    }
                }
            }

            // specify the type of request
            request.open('Get', url);

            request.send();
        });
    }

    // Data parsing
    function processWeatherData(weather) { 
        var returnData = {
            name: weather.name,
            temperature: weather.main,
            weather: weather.weather,
            wind: weather.wind,
        };

        return returnData;            
    }

    function error(err) {
        document.getElementById('container').innerHTML = '<h2 class="error">' + 'Unable to fetch weather feed, check your internet connection' + '</h2>';
    }

    function appendData(inputData) { //final function writes the data gathered and returned to the DOM

        var weather = inputData.weather;
        var i = '';
        var weatherDataAppend = '';
        var currentDate = new Date().toUTCString();

        for (i=0; i < weather.length; i++) {
            var weatherDesc = weather[i];
            var iconCode = weatherDesc.icon;
            var weatherIcon = '<span class=weather-icon-' + iconCode + '>' + '</span>' ;
        }

        weatherDataAppend += '<div class="weather weather__widget">'; 
            weatherDataAppend += '<p class="weather__desc">' + weatherIcon + weatherDesc.main  + '</p>';
            weatherDataAppend += '<p class="weather__temperature">' + inputData.temperature.temp.toFixed(0) + ('°C') + '</p>';
            weatherDataAppend += '<h2 class="weather__city-name">' + inputData.name + (', UK') + '</h2>';
            weatherDataAppend += '<p class="weather__wind">' + '<span class="weather-icon-windy"></span>' + inputData.wind.speed + (' mph') + '</p>';
            weatherDataAppend += '<p class="weather__date">' + currentDate + '</p>';
            weatherDataAppend += '<p class="weather__humidity">' + ('Humidity: ') + inputData.temperature.humidity + ('%') + '</p>';
            weatherDataAppend += '<p class="weather">' + ('Maximum temperature: ') + inputData.temperature.temp_max.toFixed(0) + ('°C') + '</p>';
            weatherDataAppend += '<p class="weather">' + ('Minimum temperature: ') + inputData.temperature.temp_min.toFixed(0) + ('°C') + '</p>';
        weatherDataAppend += '</div>';

        document.getElementById('container').innerHTML = weatherDataAppend;

    }

})();