/**
 * Created by hishamel-sayed on 24/07/2016.
 */
 (function() {
    var i, item, responseText = '';
    for (i=0; i < responseText.length; i++) {

    	weather += '<div class="weather">';

    	var weatherData = responseText[i];

    	for (item in weatherData) {
    		var london = (item + ': ' + weatherData[item]);
    		weather += '<div>' + '<p>' + listing + '</p>' + '</div>';
    	}

    	weather += '</div>';

    	document.getElementById('weather').innerHTML = weather;
    }
 

})();