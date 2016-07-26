/**
 * Created by hishamel-sayed on 24/07/2016.
 */
(function() {

    'use strict';

    var weather = document.getElementById('weather');

    getData('http://api.openweathermap.org/data/2.5/weather?q=London&appid=07c942ac99d05229807385fde0045886')
        .then(processWeatherData(weather))
        .catch(error);

})();

function processWeatherData(weather) {
   
    return function (data) {
        console.log(data);

        var i, item, weatherData = '';
        var weather = data.weather;

            for (i=0; i < weather.length; i++) {

                var weatherData = weather[i];

                for (key in weatherData) {

                    if (weatherData.hasOwnProperty(key)) {
                        var listing = (key + ': ' + weatherData[key]);
                        console.log(listing);  
                    }
                }
            }

        // console.log(data.name);
    }
}

function error(err) {
    alert('Unable to fetch weather data, please check your internet connection and try again');
}

function getData (url) {

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