module.exports = require('./src/hubs-bot.js')

var express = require('express');

var app = express();
var server = app.listen(process.env.PORT || 3000);


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});
