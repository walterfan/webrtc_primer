'use strict'


//Get <div> placeholder element from DOM
//var div = document.getElementById('scratchPad');
var sendDiv = document.getElementById('dataChannelSend');
var receiveDiv = document.getElementById('dataChannelReceive');

//JavaScript variables associated with demo buttons
var startButton = document.getElementById("startButton");
var sendButton = document.getElementById("sendButton");
var closeButton = document.getElementById("closeButton");

//On startup, just the Start button must be enabled
startButton.disabled = false;
sendButton.disabled = true;
closeButton.disabled = true;

//Associate handlers with buttons
startButton.onclick = createOrJoinRoom;
sendButton.onclick = sendMessage;
closeButton.onclick = closeChannel;


//Connect to server
var socket = io.connect('http://localhost:8181');

function createOrJoinRoom() {
	var channel = document.getElementById("roomName").value;

	if (channel !== "") {
		weblog('Trying to create or join channel: ', channel);
		// Send 'create or join' to the server
		socket.emit('create or join', channel);
	}
}

function getChannel() {
	return document.getElementById("roomName").value;
}

function getInput() {
	return document.getElementById("dataChannelSend").value;
}

function sendMessage() {
	var channel = getChannel();
	var msg = getInput();
	weblog("--> send message: " + msg)
	socket.emit('message', {
		channel: channel,
		message: msg});
}

function closeChannel() {
	socket.emit('message', {
		channel: getChannel(),
		message: "Bye"});
}



//Handle 'created' message
socket.on('created', function (channel){
	weblog('channel ' + channel + ' has been created!');
	weblog('This peer is the initiator...');

	// Dynamically modify the HTML5 page
	weblog(	' --> Channel ' + channel + ' has been created! ');

	weblog(' --> This peer is the initiator...');

	sendButton.disabled = false;
	closeButton.disabled = false;
});


//Handle 'full' message
socket.on('full', function (channel){
	weblog('channel ' + channel + ' is too crowded! Cannot allow you to enter, sorry :-(');

	weblog( ' --> channel ' + channel +	' is too crowded! Cannot allow you to enter, sorry :-( ');
});

//Handle 'remotePeerJoining' message
socket.on('remotePeerJoining', function (channel){
	weblog('Request to join ' + channel);
	weblog('You are the initiator!');
	weblog(' --> Message from server: request to join channel ' + channel );
});

//Handle 'joined' message
socket.on('joined', function (msg){
	weblog(	' --> Joined server: ' + msg );
	sendButton.disabled = false;
	closeButton.disabled = false;
});

//Handle 'broadcast: joined' message
socket.on('broadcast: joined', function (msg){
	var channel = document.getElementById("roomName").value

	weblog('Broadcast message from server: ' + msg);

	// Start chatting with remote peer:
	// 1. Get user's message
	var myMessage = getInput() ;

	// 2. Send to remote peer (through server)
	socket.emit('message', {
		channel: channel,
		message: myMessage});
});

//Handle remote logging message from server
socket.on('log', function (array){
	weblog.apply(console, array);
});

//Handle 'message' message
socket.on('message', function (message){
	
	weblog(' --> Got message from other peer: ' + message );

	// Send back response message:
	// 1. Get response from user
	receiveDiv.insertAdjacentHTML( 'beforeEnd',  message + '\n');
	var myResponse = "received " + message;

	// 2. Send it to remote peer (through server)
	socket.emit('response', {
		channel: getChannel(),
		message: myResponse});

	sendButton.disabled = false;
	closeButton.disabled = false;

});

//Handle 'response' message
socket.on('response', function (response) {
	var channel = document.getElementById("roomName").value
	
	weblog(' --> Got response from other peer: '+response );

	// Keep on chatting
	var chatMessage = document.getElementById("dataChannelSend").value;

	// User wants to quit conversation: send 'Bye' to remote party
	if(chatMessage == "Bye"){
		weblog(' --> Sending "Bye" to server...');

		socket.emit('Bye', channel);

		weblog(' --> Going to disconnect...');

		// Disconnect from server
		socket.disconnect();
	} else{
		// Keep on going: send response back to remote party (through server)
		
	}
});

//Handle 'Bye' message
socket.on('Bye', function (){
	weblog('--> Got "Bye" from other peer! Going to disconnect...');

	// Send 'Ack' back to remote party (through server)
	weblog(' --> Sending "Ack" to server');

	socket.emit('Ack');

	// Disconnect from server
	weblog(' --> Going to disconnect...');


	socket.disconnect();
});