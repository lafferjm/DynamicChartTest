"use strict";
require("reflect-metadata");
var server_1 = require("./server");
var data_1 = require("./data");
var serverApp = new server_1.ServerApp();
var database = new data_1.Data();
serverApp.setRoutes();
serverApp.startServer();
