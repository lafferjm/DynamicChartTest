var tools = require('./tools');

var express = require('express');
var app = express();

//Express partials is needed so that a layout.ejs file can be used.
var partials = require('express-partials');

//Initialize sqlite, and get database handle.
var sqlite3 = require('sqlite3').verbose();
var database = new sqlite3.Database('test.db');

var needsSetup = true;

database.serialize(function() {
    database.run("CREATE TABLE IF NOT EXISTS colors (" +
                 "color TEXT NOT NULL," +
                 "count INTEGER NOT NULL);");
});

database.all("SELECT COUNT(*) FROM colors;", function(error, rows) {
    var count = rows[0]["COUNT(*)"];

    if(count > 0) {
        needsSetup = false;
    }
    
    if(error) {
        console.log("Errors: " + error);
    }
});

if(needsSetup) {
    var statement = database.prepare("INSERT INTO colors VALUES (?, ?)");
    statement.run("Red", 12);
    statement.run("Blue", 19);
    statement.run("Yellow", 3);
    statement.run("Green", 5);
    statement.run("Purple", 2);
    statement.run("Orange", 3);
}

//This information will come from the database and
//need to be put into array.  Might as well get started now.
var dataArray = [];
dataArray.push(12);
dataArray.push(19);
dataArray.push(3);
dataArray.push(5);
dataArray.push(2);
dataArray.push(3);

var labelArray = [];
labelArray.push("Red");
labelArray.push("Blue");
labelArray.push("Yellow");
labelArray.push("Green");
labelArray.push("Purple");
labelArray.push("Orange");

//Set the templating engine to embedded javascript and enable partials.
app.set('view engine', 'ejs');
app.use(partials());

app.get('/', function(req, res) {

    var fillColorArray = [];
    var borderColorArray = [];

    for(var i = 0; i < 6; ++i) {
        var color = tools.randomColor();
        fillColorArray.push(color[0]);
        borderColorArray.push(color[1]);
    }

    //Send our fake data back to the client.
    res.render('index', { data: dataArray,
                          labels: labelArray,
                          fillColors: fillColorArray,
                          borderColors: borderColorArray});
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});