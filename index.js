var express = require('express');
var socket = require('socket.io');
var connections = [];
// App setup
var app  = express();
var server = app.listen((process.env.PORT || 5000),function(){
    console.log("Server UP ON PORT: "+ (process.env.PORT || 5000));
});
app.get('/newcode', function (req, res) {

});
app.get('/connections', function (req, res) {
    res.send(connections);
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
    var connectionCode = getRandomInt(100000,1000000).toString();
    res.send(connectionCode);
    connections.push({id:connectionCode, confirmed:false, socketid:""});
    socket.emit('concode',connectionCode);
    /*socket.on('new user', function(data){
        var connectionIndex = find(data);
        if(connectionIndex!==-1){
            connections[connectionIndex].socketid = socket.id;
        }
    });*/
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