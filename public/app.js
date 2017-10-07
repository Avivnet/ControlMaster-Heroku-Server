var socket = io.connect("https://nodejs-aviv.herokuapp.com");
var app = new Vue({
    el: '#app',
    data: {
        concode:'000000'
    },
    methods: {
        getCode: function(){
            $.get( "/newcode", function( data ) {
                app.concode = data;
            });
        },
    },
    mounted() { // when the Vue app is booted up, this is run automatically.
        this.getCode();
    }
});


socket.on('acmedia',function(data){
    //Data handle
});