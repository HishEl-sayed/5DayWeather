/**
 * Created by hishamel-sayed on 24/07/2016.
 */
(function() {

    'use strict';

    var weather = document.getElementById('weather');

    getData('http://api.openweathermap.org/data/2.5/weather?q=London&appid=07c942ac99d05229807385fde0045886')
        .then(processWeatherData)
        .catch(function (err) {
            console.log(err);
        });

    function processWeatherData(data) {

        // weather.innerHTML = JSON.stringify(data);
        // console.log(JSON.stringify(data));
        // console.log(data.toString());

        console.log(data);
    }

})();

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