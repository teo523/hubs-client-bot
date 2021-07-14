module.exports = require('./src/hubs-bot.js')
var config = require(__dirname + '/config');
var express = require('express');

var app = express();
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io')(server);

var partners = {"grupo1u1": 1, "grupo1u2": 1, "grupo2u1": 2, "grupo2u2": 2, "grupo3u1": 3, "grupo3u2": 3, "grupo4u1": 4, "grupo4u2": 4, "grupo5u1": 5, "grupo5u2": 5, "grupo6u1": 6, "grupo6u2": 6, "grupo7u1": 7, "grupo7u2": 7, "grupo8u1": 8, "grupo8u2": 8, "grupo9u1": 9, "grupo9u2": 9, "grupo10u1": 10, "grupo10u2": 10, "grupo11u1": 11, "grupo11u2": 11, "grupo12u1": 12, "grupo12u2": 12, "grupo13u1": 13, "grupo13u2": 13, "grupo14u1": 14, "grupo14u2": 14, "grupo15u1": 15, "grupo15u2": 15};
var channels = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[],13:[],14:[],15:[]};

app.use(express.static(__dirname + '/public'));