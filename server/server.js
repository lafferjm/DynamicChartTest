"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var expressPartial = require("express-partials");
var data_1 = require("./data");
var tools_1 = require("./tools");
var ServerApp = (function () {
    function ServerApp() {
        this._App = express();
        this._App.set('view engine', 'ejs');
        this._App.set('views', '../views');
        this._App.use(expressPartial());
        this._App.use(bodyParser.json());
        this._App.use(bodyParser.urlencoded({ extended: true }));
        //Lame "Hack" to prepopulate the data if it doesn't exist
        var database = new data_1.Data();
    }
    ServerApp.prototype.setRoutes = function () {
        this._App.get('/', this._RenderChart);
        this._App.post('/add', this._AddColor);
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
        //These didn't work as class variables, so had to implement
        //lame work around.
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
    ServerApp.prototype._AddColor = function (req, res) {
        var color = req.body.name;
        var count = req.body.amount;
        var database = new data_1.Data();
        database.insertData(color, count);
        res.send(color + ' ' + count);
    };
    return ServerApp;
}());
exports.ServerApp = ServerApp;
