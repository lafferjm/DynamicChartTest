import * as express from 'express';
import expressPartial = require('express-partials');
import {Data} from './data';
import {Tools} from './tools';

export class ServerApp {

    private _App: express.Express;

    constructor() {
        this._App = express();
        this._App.set('view engine', 'ejs');
        this._App.set('views', '../views');
        this._App.use(expressPartial());

        let database = new Data();

    }

    public setRoutes() {
        this._App.get('/', this._RenderChart);
    }

    public startServer() {
        this._App.listen(5000, function() {
            console.log('Example app listening on port 5000!');
        });
    }

    private _RenderChart(req: express.Request, res: express.Response) {
        let colorArray: Array<string> = [];
        let countArray: Array<number> = [];
        let fillColorArray: Array<string> = [];
        let borderColorArray: Array<string> = [];
        
        /*
        colorArray.push("Red");
        countArray.push(10);
        fillColorArray.push('rgba(188, 125, 0, 0.2)');
        borderColorArray.push('rgba(188, 125, 0, 1)');
        */

        let database = new Data();
        let tools = new Tools();

        database.getAllData().forEach(function(item) {
            let color = tools.randomColor();
            
            fillColorArray.push(color[0]);
            borderColorArray.push(color[1]);

            colorArray.push(item["color"]);
            countArray.push(item["count"]);
        });

        res.render('index', {labels: colorArray,
                            data: countArray,
                            fillColors: fillColorArray,
                            borderColors: borderColorArray});
    }
}