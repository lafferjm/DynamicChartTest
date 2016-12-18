import {ServerApp} from './server';

var serverApp = new ServerApp();

serverApp.setRoutes();
serverApp.startServer();