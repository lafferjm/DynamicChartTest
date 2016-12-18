var tools = require('./tools');

var express = require('express');
var app = express();

//Express partials is needed so that a layout.ejs file can be used.
var partials = require('express-partials');

//Initialize sqlite, and get database handle.
var sql = require('sqlite3');
var database = new sql.Database('test.db');

database.run("CREATE TABLE IF NOT EXISTS colors (" +
             "color TEXT NOT NULL," +
             "count INTEGER NOT NULL);");

database.all("SELECT COUNT(*) FROM colors;", function(error, rows) {
    var count = rows[0]["COUNT(*)"];

    if(count == 0) {
        var statement = database.prepare("INSERT INTO colors VALUES (?, ?)");
        statement.run("Red", 12);
        statement.run("Blue", 19);
        statement.run("Yellow", 3);
        statement.run("Green", 5);
        statement.run("Purple", 2);
        statement.run("Orange", 3);
    }
    
    console.log("Count: " + count);

    if(error) {
        console.log("Errors: " + error);
    }
});

//Will contain the values from the database containing color
//and count
var colorArray = [];
var countArray = [];
    
//Will contain random values for drawing the bars
var fillColorArray = [];
var borderColorArray = [];
    
database.each("SELECT color, count FROM colors;", function(error, rows) {
    var color = tools.randomColor();

    colorArray.push(rows.color);
    countArray.push(rows.count);

    fillColorArray.push(color[0]);
    borderColorArray.push(color[1]);

    if(error) {
        console.log(error);
    }
});

//Set the templating engine to embedded javascript and enable partials.
app.set('view engine', 'ejs');
app.use(partials());

app.get('/', function(req, res) {
    //Send our fake data back to the client.
    res.render('index', { labels: colorArray,
                          data: countArray,
                          fillColors: fillColorArray,
                          borderColors: borderColorArray});
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});