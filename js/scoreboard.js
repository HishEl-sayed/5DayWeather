/**
 * Created by hishamel-sayed on 24/07/2016.
 */
var Scoreboard = function() {
    var message = 'welcome to the game';
    function printMessage() {
        console.log(message);
    }
    return {
        showMessage: printMessage
    }

};

var myScoreboard = new Scoreboard();
myScoreboard.showMessage();