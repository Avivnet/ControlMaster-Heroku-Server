var express = require('express');
var socket = require('socket.io');
var users = [];
// App setup
var app  = express();
var server = app.listen((process.env.PORT || 5000),function(){
    console.log("Server UP ON PORT: "+ (process.env.PORT || 5000));
});
app.get('/newcode', function (req, res) {
    var connectionCode = getRandomInt(100000,1000000).toString();
    res.send(connectionCode);
    users.push(connectionCode);
});
app.get('/connections', function (req, res) {
    res.send(users);
});
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
// Static Routes
app.use(express.static('public'));


// Socket Setup
var io = socket(server);

io.on('connection',function(socket){
    console.log("WS Connected - " + socket.id);
    socket.on('acmedia', function(data){

        io.sockets.emit('acmedia',data);
    });
});
