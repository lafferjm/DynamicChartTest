var express = require('express');
var app = express();

//Express partials is needed so that a layout.ejs file can be used.
var partials = require('express-partials');

//Set the templating engine to embedded javascript and enable partials.
app.set('view engine', 'ejs');
app.use(partials());

app.get('/', function(req, res) {
    //Send our fake data back to the client.
    res.render('index', { data: '[12, 19, 3, 5, 2, 3]'});
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});