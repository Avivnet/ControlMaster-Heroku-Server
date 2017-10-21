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
    var rgb = [req.params.r,req.params.g,req.params.b];
    for(var i = 0; i<rgb.length; i++)
        if(isNaN(rgb[i])) res.send('wrong parameters!'); return;
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
    //Start a new connection
    var connection = {connectionCode:getNewCode(),socketid:socket.id, phoneIp:socket.handshake.address}
    //Add the connection to the list
    connections.push(connection);
    //Send the connection code back to the newly connected client
    socket.emit('concode',connection.connectionCode);
    //Logging the connection
    console.log("WS Connected - "+ JSON.stringify(connection));
    //Handling an action of button click on the phone
    socket.on('acmedia', function(data){
        
        io.sockets.emit('acmedia',data);
    });
    socket.on("disconnect",function(){
        remove(connections,find(socket.id,true));
        console.log("con close -" + socket.id);
    });
});
function getNewCode(){
    var connectionCode = getRandomInt(100000,1000000).toString();
    while(find(connectionCode)!=-1) 
         connectionCode = getRandomInt(100000,1000000).toString();
    return connectionCode;
}
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