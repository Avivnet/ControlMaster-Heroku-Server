var express = require('express');
var socket = require('socket.io');

// App setup
var app  = express();
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

// Static Routes
//app.use(express.static('public'));

// Socket Setup
var io = socket(server);

io.on('connection',function(socket){
    console.log("WS Connected - " + socket.id);
    socket.on('acmedia', function(data){

        io.sockets.emit('acmedia',data);
    });
});
