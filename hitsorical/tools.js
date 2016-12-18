
//Needed so that the numbers are always random
//and not just when script starts.
var seedrandom = require('seedrandom');

module.exports = {
    randomColor: function() {
        var date = new Date();
        var rng = seedrandom(date.getTime(), {entropy: true});
        
        var red = 0;
        var green = 0;
        var blue = 0;

        var fillColor = '';
        var borderColor = '';

        red = Math.floor(rng() * 255);
        green = Math.floor(rng() * 255);
        blue = Math.floor(rng() * 255);

        fillColor = 'rgba(' + red + ',' + green + ',' + blue + ',' + '0.2)';
        borderColor = 'rgba(' + red + ',' + green + ',' + blue + ',' + '1)';

        return [fillColor, borderColor];
    }
};