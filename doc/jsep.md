# What

Javascript Session Establishment Protocol (JSEP)
https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-26

## Abstract

JSEP 即 Javascript 会话创建协议

# Why

Motivation

Abstract

# How

JavaScript Session Establishment Protocol (JSEP) that allows for full control of the signaling state machine from JavaScript. 

JavaScript making use of two interfaces:  //两个接口： 传送本地和远端的会话描述， 以 ICE 状态机进行交互性的连通性检查

* (1) passing in local and remote session descriptions and 
* (2) interacting with the ICE state machine.  


Whenever an offer/answer exchange is needed,  // Alice: createOffer -> setLocalDescrition, Bob: setRemoteDescription -> createAnswer -> setLocalDescription

1. the initiating side creates an offer by calling a createOffer() API.  

2. The application then uses that offer to set up its local config via the  setLocalDescription() API.  // 本地

The offer is finally sent off to the remote side over its preferred signaling mechanism (e.g., WebSockets); 

3. upon receipt of that offer, the remote party installs it using the setRemoteDescription() API.  // 远端

4.  To complete the offer/answer exchange, the remote party uses the createAnswer() API to generate an appropriate answer, 
applies it using the setLocalDescription() API, and sends the answer back to the  initiator over the signaling channel.


# Semantics and Syntax

## Signaling Model

信令模型：

       +-----------+                               +-----------+
       |  Web App  |<--- App-Specific Signaling -->|  Web App  |
       +-----------+                               +-----------+
             ^                                            ^
             |  SDP                                       |  SDP
             V                                            V
       +-----------+                                +-----------+
       |   JSEP    |<----------- Media ------------>|   JSEP    |
       |   Impl.   |                                |   Impl.   |
       +-----------+                                +-----------+


                      Figure 1: JSEP Signaling Model


## Session Descriptions and State Machine

in order to handle session descriptions properly, the JSEP implementation needs:

   1.  To know if a session description pertains to the local or remote
       side.

   2.  To know if a session description is an offer or an answer.

   3.  To allow the offer to be specified independently of the answer.


<pre>
                       setRemote(OFFER)               setLocal(PRANSWER)
                           /-----\                               /-----\
                           |     |                               |     |
                           v     |                               v     |
            +---------------+    |                +---------------+    |
            |               |----/                |               |----/
            |  have-        | setLocal(PRANSWER)  | have-         |
            |  remote-offer |------------------- >| local-pranswer|
            |               |                     |               |
            |               |                     |               |
            +---------------+                     +---------------+
                 ^   |                                   |
                 |   | setLocal(ANSWER)                  |
   setRemote(OFFER)  |                                   |
                 |   V                  setLocal(ANSWER) |
            +---------------+                            |
            |               |                            |
            |               |<---------------------------+
            |    stable     |
            |               |<---------------------------+
            |               |                            |
            +---------------+          setRemote(ANSWER) |
                 ^   |                                   |
                 |   | setLocal(OFFER)                   |
   setRemote(ANSWER) |                                   |
                 |   V                                   |
            +---------------+                     +---------------+
            |               |                     |               |
            |  have-        | setRemote(PRANSWER) |have-          |
            |  local-offer  |------------------- >|remote-pranswer|
            |               |                     |               |
            |               |----\                |               |----\
            +---------------+    |                +---------------+    |
                           ^     |                               ^     |
                           |     |                               |     |
                           \-----/                               \-----/
                       setLocal(OFFER)               setRemote(PRANSWER)


                       Figure 2: JSEP State Machine
</pre>


# Example


# Conclusion


# Reference

