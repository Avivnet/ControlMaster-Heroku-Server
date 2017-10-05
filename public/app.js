var socket = io.connect("https://nodejs-aviv.herokuapp.com");

socket.on('acmedia',function(data){
    alert(data);
});