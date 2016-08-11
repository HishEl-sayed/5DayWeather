

function getData(url) {

    return new Promise(function (resolve, reject) {

        var request = new XMLHttpRequest();

        // keep track of the request
        request.onreadystatechange = function() {

            // check if the response data send back to us
            if(request.readyState === 4) { 
                if(request.status === 200) {
                    // update the HTML of the element
                    resolve(JSON.parse(request.responseText));
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

function processWeatherData(weather) {
   
    return function(data) { //begin function to start reading the data promised back
        // console.log(data);

        var i, item, weatherData = ''; 
        var city = data.name;
        var weather = data.weather;
        //set the weather returned as a variable

        for (i=0; i < weather.length; i++) {
            //iterate through the returned data 
            var weatherData = weather[i];

            for (key in weatherData) { //look through weather object 

                if (weatherData.hasOwnProperty(key)) { // check and ignore prototype objects 
                    var forecast = (key + ': ' + weatherData[key]);
                    console.log(forecast);
                }
            }

            var temperature = data.main; // define temperature, specified as 'main' within the AJAX call

            Object.keys(temperature).forEach(function(key) { //iterate through the length of the object. Prototype allows us to ignore prototype objects
                    
                var temperatureData = (key, temperature[key]);
                console.log(temperatureData);

            });

        }
    }

}

function error(err) {
    console.log('Unable to fetch weather data, please check your internet connection and try again');
}


(function() {

    'use strict';

    getData('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=07c942ac99d05229807385fde0045886')
        .then(processWeatherData(weather))
        .catch(error);

})();

