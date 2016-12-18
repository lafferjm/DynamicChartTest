"use strict";
var server_1 = require("./server");
var tools_1 = require("./tools");
var serverApp = new server_1.ServerApp();
var tools = new tools_1.Tools();
serverApp.setRoutes();
serverApp.startServer();
console.log(tools.randomColor());
