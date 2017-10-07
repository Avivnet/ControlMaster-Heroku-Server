var socket = io.connect("https://nodejs-aviv.herokuapp.com");

socket.on('acmedia',function(data){
    Materialize.toast(data);

});