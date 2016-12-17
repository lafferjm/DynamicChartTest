var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    //res.send('Hello World!');
    res.sendFile(path.join(__dirname + '/chart.html'));
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});