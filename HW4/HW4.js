var shelljs = require('shelljs');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/HW4.html');
});

app.get ('/api', function (req, res) {

  var r_max_x = req.query.R_max_x;
  var r_max_y = req.query.R_max_y;
  var r_min_x = req.query.R_min_x;
  var r_min_y = req.query.R_min_y;
  var cir_c_x = req.query.cir_c_x;
  var cir_c_y = req.query.cir_c_y;
  var radius = req.query.Radius;


	shelljs.exec('HW4.exe ' + r_max_x + ' ' + r_max_y+ ' ' + r_min_x+ ' ' + r_min_y+ ' ' + cir_c_x+ ' ' + cir_c_y+ ' ' + radius, function(status, output) {
	  console.log('Exit status:', status);
	  console.log('Program output:', output);

      var output = {
        status: status,
        output: output
      };
      res.writeHead(200, {
      		  "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
      	  });

      	  res.write( JSON.stringify(output) );
      	  res.end();

      	});

      });


      // or simply
      // app.listen (1337);
      // will do

      var server = app.listen (1337, function() {
      	var host = server.address().address;
      	var port = server.address().port;
      	console.log ('server started on http://' + host + ':' + port);
      });
