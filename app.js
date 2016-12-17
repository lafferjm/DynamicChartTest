var tools = require('./tools');

var express = require('express');
var app = express();

//Express partials is needed so that a layout.ejs file can be used.
var partials = require('express-partials');

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