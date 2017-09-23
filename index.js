var express = require('express')
var app = express()
var fs = require('fs')
var url = require('url')

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.post('/m8', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var txt = req.body.name+ " "+ req.body.phone;
  res.write(txt);
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
