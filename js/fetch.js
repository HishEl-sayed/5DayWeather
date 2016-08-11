'use strict';


(function() {

    getData('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=07c942ac99d05229807385fde0045886') //grab the 
        .then(function(weatherData) {
            return processWeatherData(weatherData);
        })
        .then(function(processedWeatherData) {
            return appendData(processedWeatherData);
        })
        .then(function(msg) {
            console.log(msg);
        })
        .catch(error);


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

    // Data parsing
    function processWeatherData(weather) {

        console.log(weather);
        var returnData = {
            name: weather.name,
            temperature: weather.main,
            weather: weather.weather
        }

        return returnData;            
    }

    function error(err) {
        console.log('Unable to fetch weather data, please check your internet connection and try again');
    }

    function appendData(inputData) {

        console.log('name', inputData.name);
        console.log('humidity', inputData.temperature.humidity);
        console.log('pressure', inputData.temperature.pressure);

        // var weather = inputData.weather;

        //     var weatherData = weather[i];

        //     Object.keys(weatherData).forEach(function(key) { //look through weather object 

        //         var forecast = (key + ': ' + weatherData[key]);
        //         // returnItem.forecast = forecast;
        //         console.log('forecast');

        //     });
        return 'hello world';

    }

})();



// function _processWeatherData(weather) {
   
//     return function(data) { //begin function to start reading the data promised back
//         console.log(data);
//         console.log(data.main.humidity);

//         var i, item, weatherData, weatherTxt = ''; 
//         var city = data.name;
//         var weather = data.weather;
//         var returnData = [];
//         //set the weather returned as a variable

//         return;

//         for (i=0; i < weather.length; i++) {

//             var returnItem = { //create the return object that I'm going to append to the DOM
//                 temperatureData: null,
//                 city: city,
//                 forecast: null
//             };

//             //weatherTxt += '<div class="weather">'; // create string that will hold data returned
//             //iterate through the returned data 
//             var weatherData = weather[i];

//             Object.keys(weatherData).forEach(function(key) { //look through weather object 

//                 var forecast = (key + ': ' + weatherData[key]);
//                 // weatherTxt += '<div>' + forecast + '</div>';
//                 returnItem.forecast = forecast;

//             });

//             var temperature = data.main; // define temperature, specified as 'main' within the AJAX call

//             Object.keys(temperature).forEach(function(key) { //iterate through the length of the object. Prototype allows us to ignore prototype objects
                    
//                 var temperatureData = (key, temperature[key]);
//                 //weatherTxt += '<div>' + temperatureData + '</div>';
//                 returnItem.temperatureData = temperatureData;
//                 console.log(temperatureData);

//             });

//             //weatherTxt += '</div>';

//             returnData.push(returnItem);

//         }
//         console.log(city);

//         //return returnData;
//         appendData(returnData);
//     }


// }

