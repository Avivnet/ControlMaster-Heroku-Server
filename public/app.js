var socket = io.connect("https://nodejs-aviv.herokuapp.com");
var app = new Vue({
    el: '#app',
    data: {
        concode:'000000'
    },
    methods: {
        newCode: function(){
            $("#code-section").hide();
            $("#codepre").show();
            socket.disconnect();
            socket.connect();
        }
    },
    mounted() { // when the Vue app is booted up, this is run automatically.
       
    }
});


socket.on('concode',function(data){
    app.concode=data.toString();
    $("#codepre").hide();
    $("#code-section").fadeIn();

});
socket.on('acmedia',function(data){
    //Data handle
});
