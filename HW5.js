var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 8000;
var c0 = false, c1 = false;
server.listen (port, function() {
  console.log ('listening on port ' + port)
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/HW5.html');
});

///////////////////////////////////////
// global variables
// nID: for ID of connecting client
// status: array of status objects {id, turning}
//
var nID = 0;
var status = [];

io.on('connect', function(socket){

  //////////////////////////////////////////////////////////
  // things to do when a client connects
  console.log ('a user connected with socket ');

  // assign and return the ID to the new client
  console.log ('client ' + nID + ' login ...')
  socket.emit ('id_set', nID);

  socket.broadcast.emit ('new_id', nID);

  // broadcast to all OTHERS of new client
  // socket.broadcast.emit ('new_id', nID)
  // inform the status of all other clients ...
  // new kid needs to learn about old fellows

  status.push ({id: nID, turn: false});
  console.log (status);
  io.emit ('update_status', status)

  // this must be the LAST thing to do
  ++nID;


  //////////////////////////////////////////////////////////
  socket.on('countup', function(myID) {
  	console.log (myID + ': speedup');
  	// find myID in status
  	let i;
  	for (i = 0; i < status.length; i++) {
  	  if (status[i].id === myID) break;
  	}
 	status[i].turn = true;

 	console.log (status);
  	socket.emit ('update_status', status);
  });

  socket.on('countdown', function(myID) {
    console.log (myID + ': speeddown');
    // find myID in status
    let i;
    for (i = 0; i < status.length; i++) {
      if (status[i].id === myID) break;
    }
  status[i].turn = false;

  console.log (status);
    socket.emit ('update_status', status);
  });

  socket.on('loadOK', function(myID) {
		if(myID === 0) c0 = true;
		if(myID === 1) c1 = true;
		console.log("C0: " + c0 + "  C1: " + c1);
		if(c0 && c1) io.emit ('checkOK', 1000);
    });

  socket.on ('angle_now', function (data) {
	let angle = data.angle;
	console.log ('from client: ' + data.id + ':' + angle);
	socket.broadcast.emit ('angle_now', data);
});


});
