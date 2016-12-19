"use strict";
var express = require("express");
var expressPartial = require("express-partials");
var data_1 = require("./data");
var tools_1 = require("./tools");
var ServerApp = (function () {
    function ServerApp() {
        this._App = express();
        this._App.set('view engine', 'ejs');
        this._App.set('views', '../views');
        this._App.use(expressPartial());
        var database = new data_1.Data();
    }
    ServerApp.prototype.setRoutes = function () {
        this._App.get('/', this._RenderChart);
    };
    ServerApp.prototype.startServer = function () {
        this._App.listen(5000, function () {
            console.log('Example app listening on port 5000!');
        });
    };
    ServerApp.prototype._RenderChart = function (req, res) {
        var colorArray = [];
        var countArray = [];
        var fillColorArray = [];
        var borderColorArray = [];
        /*
        colorArray.push("Red");
        countArray.push(10);
        fillColorArray.push('rgba(188, 125, 0, 0.2)');
        borderColorArray.push('rgba(188, 125, 0, 1)');
        */
        var database = new data_1.Data();
        var tools = new tools_1.Tools();
        database.getAllData().forEach(function (item) {
            var color = tools.randomColor();
            fillColorArray.push(color[0]);
            borderColorArray.push(color[1]);
            colorArray.push(item["color"]);
            countArray.push(item["count"]);
        });
        res.render('index', { labels: colorArray,
            data: countArray,
            fillColors: fillColorArray,
            borderColors: borderColorArray });
    };
    return ServerApp;
}());
exports.ServerApp = ServerApp;
