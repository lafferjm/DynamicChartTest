var tools = require('./tools');

var express = require('express');
var app = express();

//Express partials is needed so that a layout.ejs file can be used.
var partials = require('express-partials');

//Initialize sqlite, and get database handle.
var sql = require('sqlite3');
var database = new sql.Database('test.db');

//Create reference to the orm
var Sequelize = require('sequelize');

//Create reference to the database
var sequelize = new Sequelize('colors', 'username', 'password', {
    dialect: 'sqlite',
    storage: './test.db'
});

sequelize.authenticate()
         .then(function(err) {
             console.log('Connection has been established successfully.');
         }, function(err) {
             console.log('Unable to connect to the datbase:', err);
         });

//Create a model to represent a color
//Notice no id, it gets one by default
var Color = sequelize.define('Color', {
    color: Sequelize.STRING,
    count: Sequelize.INTEGER
});

//Create the table in the database if it doesn't exist
sequelize.sync()
         .then(function(err) {
             console.log('Table created!');
         }, function(err) {
             console.log('An error occurred while creating the table: ', err);
         })
         .then(function() {
            Color.count().then(function(colorCount) {
                if(colorCount == 0) {
                    Color.bulkCreate([
                        {color: "Red", count: 12},
                        {color: "Blue", count: 19},
                        {color: "Yellow", count: 3},
                        {color: "Green", count: 5},
                        {color: "Purple", count: 2},
                        {color: "Orange", count: 3}
                    ]).then(function() {
                        return Color.findAll();
                    }).then(function(colors) {
                        //console.log(colors);
                     });
                }
            });
         });



//Set the templating engine to embedded javascript and enable partials.
app.set('view engine', 'ejs');
app.use(partials());

app.get('/', function(req, res) {
    
    //Will contain the values from the database containing color
    //and count
    var colorArray = [];
    var countArray = [];
    
    //Will contain random values for drawing the bars
    var fillColorArray = [];
    var borderColorArray = [];
    
    Color.findAll()
         .then(function(resultSet) {
            resultSet.forEach(function(result) {
                var color = tools.randomColor();

                colorArray.push(result.color);
                countArray.push(result.count);

                fillColorArray.push(color[0]);
                borderColorArray.push(color[1]);
            });
         })
        .then(function() {
            //Send our fake data back to the client.
            res.render('index', { labels: colorArray,
                                  data: countArray,
                                  fillColors: fillColorArray,
                                  borderColors: borderColorArray});
        });
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});