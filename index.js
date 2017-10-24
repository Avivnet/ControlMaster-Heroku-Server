var express = require('express');
var socket = require('socket.io');
var connections = [];
// App setup
var app  = express();
var server = app.listen((process.env.PORT || 5000),function(){
    console.log("Server UP ON PORT: "+ (process.env.PORT || 5000));
});

//Get all active connections
app.get('/connections', function (req, res) {
    res.send(connections);
});

/*
app.get('/color/:r/:g/:b',function(req,res){
    var rgb = [req.params.r,req.params.g,req.params.b];
    for(var i = 0; i<rgb.length; i++)
        if(isNaN(rgb[i])) res.send('wrong parameters!'); return;
    var color = 'rgb('+req.params.r+','+req.params.g+','+req.params.b+')';
    res.send(color);
});
*/


// Static Routes
app.use(express.static('public'));

// Socket Setup
var io = socket(server);

io.on('connection',function(socket){
    //Start a new connection
    var connection = {connectionCode:getNewCode(),socketid:socket.id,c_socketid:0};
    //Add the connection to the list
    connections.push(connection);
    //Send the connection code back to the newly connected client
    socket.emit('concode',connection.connectionCode);
    //Logging the connection
    console.log("WS Connected - "+ JSON.stringify(connection));
    //Handling an action of button click on the phone
    socket.on('acmedia', function(data){
        if(connection.c_socketid!=0)
            io.sockets.connected(connection.c_socketid).emit('acmedia',data);
    });
    //The computer says im a computer and i have a code
    socket.on('im_comp',function(data){
        var con = getConnectionByCode(data);
        if(con!=null){
            removeConnectionByCode(connection.connectionCode);
            connection = con;
            connection.c_socketid= socket.id;
            io.sockets.connected(connection.socketid).emit('con','connected');
            socket.emit('con','ok');
        }
        else{
            socket.emit('con','fail');
            console.log(data.toString() + " " + JSON.stringify(connections));
        }
    });
    socket.on("disconnect",function(){
        removeConnectionByCode(connection.connectionCode);
        console.log("con close -" + socket.id);
    });
});

//Connections methods:
function getNewCode(){
    var connectionCode = getRandomInt(100000,1000000).toString();
    while(getConnectionByCode(connectionCode)!=null) 
         connectionCode = getRandomInt(100000,1000000).toString();
    return connectionCode;
}
function getConnectionByCode(code){
    for(var i=0; i<connections.length;i++){
        if(parseInt(connections[i].connectionCode.toString())==parseInt(code.toString()))
            return connections[i];
    }
    return null;
}
function removeConnectionByCode(code){
    for(var i=0; i<connections.length;i++){
        if(connections[i].connectionCode==code)
        {
            array.splice(i, 1);
        }
    }
}
//END

//Helpers:
//Random number generator
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
//END