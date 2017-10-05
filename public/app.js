var socket = io.connect("http://localhost:3333");

socket.on('acmedia',function(data){
    alert(data);
});