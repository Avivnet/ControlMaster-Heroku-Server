var socket = io.connect("https://nodejs-aviv.herokuapp.com:14409");

socket.on('acmedia',function(data){
    alert(data);
});