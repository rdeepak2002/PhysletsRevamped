var express = require('express')
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
	res.sendFile('/public/simulations/simulations.html', {"root": __dirname});
})

app.listen(port, function() {
	console.log('app running')
})