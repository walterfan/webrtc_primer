信令
=============

What is signaling?
-------------------------
WebRTC uses RTCPeerConnection to communicate streaming data between browsers, but also needs a mechanism to coordinate communication and to send control messages, a process known as signaling. Signaling methods and protocols are not specified by WebRTC. In this codelab you will use Socket.IO for messaging, but there are many alternatives.
What are STUN and TURN?

WebRTC is designed to work peer-to-peer, so users can connect by the most direct route possible. However, WebRTC is built to cope with real-world networking: client applications need to traverse NAT gateways and firewalls, and peer to peer networking needs fallbacks in case direct connection fails. As part of this process, the WebRTC APIs use STUN servers to get the IP address of your computer, and TURN servers to function as relay servers in case peer-to-peer communication fails. (WebRTC in the real world explains in more detail.)
Is WebRTC secure?

Encryption is mandatory for all WebRTC components, and its JavaScript APIs can only be used from secure origins (HTTPS or localhost). Signaling mechanisms aren't defined by WebRTC standards, so it's up to you make sure to use secure protocols.

WebSocket
-------------------------
HTTP 协议固然够流行，够简单，但是单向，易读易扩展，可是冗长繁琐，单向通讯的缺点让它在实时通讯中难以为继。
WebSocket 应运而生，它利用了已有的HTTP 基础设施，轻松穿越防火墙，各种负载均衡器都有支持, 它的详细定义参见协议 https://tools.ietf.org/html/rfc6455。