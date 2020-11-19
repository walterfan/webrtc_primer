//Get <div> placeholder element from DOM
div = document.getElementById('scratchPad');

//JavaScript variables associated with demo buttons
var startButton = document.getElementById("startButton");
var sendButton = document.getElementById("sendButton");
var closeButton = document.getElementById("closeButton");

//On startup, just the Start button must be enabled
startButton.disabled = false;
sendButton.disabled = true;
closeButton.disabled = true;

//Associate handlers with buttons
startButton.onclick = createConnection;
sendButton.onclick = sendData;
closeButton.onclick = closeDataChannels;

function createConnection() {

}

function sendData() {

}

function closeDataChannels() {

}
//Connect to server
var socket = io.connect('http://localhost:8181');

//Ask channel name from user
channel = prompt("Enter signalling channel name:");

if (channel !== "") {
	weblog('Trying to create or join channel: ', channel);
	// Send 'create or join' to the server
	socket.emit('create or join', channel);
}


//Handle 'created' message
socket.on('created', function (channel){
	weblog('channel ' + channel + ' has been created!');
	weblog('This peer is the initiator...');

	// Dynamically modify the HTML5 page
	div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +
		(performance.now() / 1000).toFixed(3) +	' --> Channel '
		+ channel + ' has been created! </p>');

	div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +
		(performance.now() / 1000).toFixed(3) +
		' --> This peer is the initiator...</p>');
});


//Handle 'full' message
socket.on('full', function (channel){
	weblog('channel ' + channel + ' is too crowded! \
		Cannot allow you to enter, sorry :-(');

	div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +
		(performance.now() / 1000).toFixed(3) + ' --> channel ' + channel +
		' is too crowded! Cannot allow you to enter, sorry :-( </p>');
});

//Handle 'remotePeerJoining' message
socket.on('remotePeerJoining', function (channel){
	weblog('Request to join ' + channel);
	weblog('You are the initiator!');

	div.insertAdjacentHTML( 'beforeEnd', '<p style="color:red">Time: ' +
		(performance.now() / 1000).toFixed(3) +
		' --> Message from server: request to join channel ' +
		channel + '</p>');
});

//Handle 'joined' message
socket.on('joined', function (msg){
	weblog('Message from server: ' + msg);

	div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +
		(performance.now() / 1000).toFixed(3) +
		' --> Message from server: </p>');
	div.insertAdjacentHTML( 'beforeEnd', '<p style="color:blue">' +
		msg + '</p>');

	div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +
		(performance.now() / 1000).toFixed(3) +
		' --> Message from server: </p>');
	div.insertAdjacentHTML( 'beforeEnd', '<p style="color:blue">' +
		msg + '</p>');
});

//Handle 'broadcast: joined' message
socket.on('broadcast: joined', function (msg){

	div.insertAdjacentHTML( 'beforeEnd', '<p style="color:red">Time: ' +
		(performance.now() / 1000).toFixed(3) +
		' --> Broadcast message from server: </p>');
	div.insertAdjacentHTML( 'beforeEnd', '<p style="color:red">' +
		msg + '</p>');

	weblog('Broadcast message from server: ' + msg);

	// Start chatting with remote peer:
	// 1. Get user's message
	var myMessage = prompt('Insert message to be sent to your peer:', "");

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
	weblog('Got message from other peer: ' + message);

	div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +
		(performance.now() / 1000).toFixed(3) +
		' --> Got message from other peer: </p>');
	div.insertAdjacentHTML( 'beforeEnd', '<p style="color:blue">' +
		message + '</p>');

	// Send back response message:
	// 1. Get response from user
	var myResponse = prompt('Send response to other peer:', "");

	// 2. Send it to remote peer (through server)
	socket.emit('response', {
		channel: channel,
		message: myResponse});

});

//Handle 'response' message
socket.on('response', function (response){
	weblog('Got response from other peer: ' + response);

	div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +
		(performance.now() / 1000).toFixed(3) +
		' --> Got response from other peer: </p>');
	div.insertAdjacentHTML( 'beforeEnd', '<p style="color:blue">' +
		response + '</p>');

	// Keep on chatting
	var chatMessage = prompt('Keep on chatting. Write "Bye" to quit conversation', "");

	// User wants to quit conversation: send 'Bye' to remote party
	if(chatMessage == "Bye"){
		div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +
			(performance.now() / 1000).toFixed(3) +
			' --> Sending "Bye" to server...</p>');
		weblog('Sending "Bye" to server');

		socket.emit('Bye', channel);

		div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +
			(performance.now() / 1000).toFixed(3) +
			' --> Going to disconnect...</p>');
		weblog('Going to disconnect...');

		// Disconnect from server
		socket.disconnect();
	}else{
		// Keep on going: send response back to remote party (through server)
		socket.emit('response', {
			channel: channel,
			message: chatMessage});
	}
});

//Handle 'Bye' message
socket.on('Bye', function (){
	weblog('Got "Bye" from other peer! Going to disconnect...');

	div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +
		(performance.now() / 1000).toFixed(3) +
		' --> Got "Bye" from other peer!</p>');

	div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +
		(performance.now() / 1000).toFixed(3) +
		' --> Sending "Ack" to server</p>');

	// Send 'Ack' back to remote party (through server)
	weblog('Sending "Ack" to server');

	socket.emit('Ack');

	// Disconnect from server
	div.insertAdjacentHTML( 'beforeEnd', '<p>Time: ' +
		(performance.now() / 1000).toFixed(3) +
		' --> Going to disconnect...</p>');
	weblog('Going to disconnect...');

	socket.disconnect();
});