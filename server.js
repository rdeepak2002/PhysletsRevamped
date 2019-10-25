var express = require('express')
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.sendFile('/public/simulations/simulations.html', {"root": __dirname});
})

app.get('/simulations', function(req, res) {
	res.sendFile('/public/simulations/simulations.html', {"root": __dirname});
})

app.get('/constvel1', function(req, res) {
	res.sendFile('/public/constvel1/constvel1.html', {"root": __dirname});
})

app.listen(port, function() {
	console.log('app running')
})