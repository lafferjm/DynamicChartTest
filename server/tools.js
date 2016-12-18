"use strict";
var seedrandom = require("seedrandom");
var Tools = (function () {
    function Tools() {
    }
    Tools.prototype.randomColor = function () {
        var date = new Date();
        var randomGenerator = seedrandom(date.getTime(), { entropy: true });
        var red = 0;
        var green = 0;
        var blue = 0;
        var fillColor = '';
        var borderColor = '';
        red = Math.floor(randomGenerator() * 255);
        green = Math.floor(randomGenerator() * 255);
        blue = Math.floor(randomGenerator() * 255);
        fillColor = 'rgba(' + red + ',' + green + ',' + blue + ',0.2)';
        borderColor = 'rgba(' + red + ',' + green + ',' + blue + ',1)';
        return [fillColor, borderColor];
    };
    return Tools;
}());
exports.Tools = Tools;
