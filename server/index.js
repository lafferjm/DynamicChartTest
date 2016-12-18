"use strict";
var server_1 = require("./server");
var serverApp = new server_1.ServerApp();
serverApp.setRoutes();
serverApp.startServer();
