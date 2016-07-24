/**
 * Created by hishamel-sayed on 24/07/2016.
 */
(function() {
    var request = new XMLHttpRequest();

    // keep track of the request
    request.onreadystatechange = function() {
        // check if the response data send back to us
        if(request.readyState === 4) {
            if(request.status === 200) {
                // update the HTML of the element
                weather.innerHTML = request.responseText;
            } else {
                // otherwise display an error message
                weather.innerHTML = 'An error occurred during your request: ' +  request.status + ' ' + request.statusText;
            }
        }
    }

    // specify the type of request
    request.open('Get', 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=07c942ac99d05229807385fde0045886');

    request.send();

})();