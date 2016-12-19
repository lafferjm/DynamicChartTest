import * as express from 'express';
import * as bodyParser from 'body-parser';
import expressPartial = require('express-partials');
import {Data} from './data';
import {Tools} from './tools';

var database = new Data();

export class ServerApp {

    private _App: express.Express;

    constructor() {
        this._App = express();
        this._App.set('view engine', 'ejs');
        this._App.set('views', '../views');
        this._App.use(expressPartial());
        this._App.use(bodyParser.json());
        this._App.use(bodyParser.urlencoded({extended: true}));

    }

    public setRoutes() {
        this._App.get('/', this._RenderChart);
        this._App.post('/add', this._AddColor);
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
        
        //These didn't work as class variables, so had to implement
        //lame work around.
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

    private _AddColor(req: express.Request, res: express.Response) {
        let color = req.body.name;
        let count = Number(req.body.amount);

        database.insertData(color, count);

        res.send(color + ' ' + count);
    }
}