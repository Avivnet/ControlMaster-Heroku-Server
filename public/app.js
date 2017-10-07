var socket = io.connect("https://nodejs-aviv.herokuapp.com");
var app = new Vue({
    el: '#app',
    data: {
        concode:'000000'
    },
    methods: {
        getCode: function(){
        },
    },
    mounted() { // when the Vue app is booted up, this is run automatically.
        this.getCode();
        
    }
});


socket.on('concode',function(data){
    app.concode=data.toString();
});
socket.on('acmedia',function(data){
    //Data handle
});