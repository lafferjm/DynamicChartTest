var express = require('express');
var app = express();

//Express partials is needed so that a layout.ejs file can be used.
var partials = require('express-partials');

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
    //Send our fake data back to the client.
    res.render('index', { data: [12, 19, 3, 5, 2, 3],
                          labels: labelArray});
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});