var express = require('express');
var socket = require('socket.io');
var connections = [];
// App setup
var app  = express();
var server = app.listen((process.env.PORT || 5000),function(){
    console.log("Server UP ON PORT: "+ (process.env.PORT || 5000));
});
app.get('/connections', function (req, res) {
    res.send(connections);
});
app.get('/color/:r/:g/:b',function(req,res){
    var color = 'rgb('+req.params.r+','+req.params.g+','+req.params.b+')';
    res.send(color);

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
    var connectionCode = getRandomInt(100000,1000000).toString();
    while(find(connectionCode)!=-1) 
         connectionCode = getRandomInt(100000,1000000).toString();
    var connection = {connectionCode:connectionCode,socketid:socket.id}
    connections.push(connection);
    socket.emit('concode',connectionCode);
    console.log("WS Connected - "+ connection);
    socket.on('acmedia', function(data){

        io.sockets.emit('acmedia',data);
    });
    socket.on("disconnect",function(){
        remove(connections,find(socket.id,true));
        console.log("con close -" + socket.id);
    });
});
function find(connectionCode){
    for(var i=0; i<connections.length;i++){
        if(connections[i].id==connectionCode)
        return i;
    }
    return -1;
}
function find(socketid,b){
    for(var i=0; i<connections.length;i++){
        if(connections[i].socketid==socketid)
        return i;
    }
    return -1;
}
function remove(array, index) {
    array.splice(index, 1);
}