var socket = io.connect("https://nodejs-aviv.herokuapp.com");
var app = new Vue({
    el: '#app',
    data: {
        concode:'000000'
    },
    methods: {
    }
});


socket.on('acmedia',function(data){
    //Data handle
});