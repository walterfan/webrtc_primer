**********************
WebSocket
**********************


Overview
======================

.. code-block:: java

    <dependency>
        <groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-websocket</artifactId>
	</dependency>



Example
=======================

* nodejs

.. code-block:: javascript

    const WebSocket = require('ws');
    const server = new WebSocket.Server({
      port: 8080
    });

    let connections = [];
    server.on('connection', function(connection) {
      connections.push(socket);

      // When you receive a message, send that message to every socket.
      connection.on('message', function(msg) {
        connections.forEach(s => s.send(msg));
      });

      // When a socket closes, or disconnects, remove it from the array.
      connection.on('close', function() {
        connections = connections.filter(s => s !== connection);
      });
    });


Reference
----------------------

* https://spring.io/guides/gs/messaging-stomp-websocket/
* https://developer.aliyun.com/article/613916