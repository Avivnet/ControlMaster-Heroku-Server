var socket = io.connect("https://control-master.herokuapp.com");
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
        $('.modal').modal();
        if(getCookie('firstTime')=="")
        {
            $("#getstarted").modal('open');
            setCookie('firstTime','the_value', 365);
        }
    }
});
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

socket.on('concode',function(data){
    app.concode=data.toString();
    $("#codepre").hide();
    $("#code-section").fadeIn();

});
socket.on('acmedia',function(data){
    //Data handle
});
