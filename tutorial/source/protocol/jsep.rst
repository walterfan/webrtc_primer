###############
JSEP
###############


Overview
=================

JSEP's architecture also avoids a browser having to save state: that is, to function as a signaling state machine. This would be problematic if, for example, signaling data was lost each time a page was reloaded. Instead, signaling state can be saved on a server.

.. figure.. https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/jsep.png

WebRTC呼叫设置的设计重点是控制媒体平面，使信令平面的行为尽可能地取决于应用程序。理由是，不同的应用程序可能更喜欢使用不同的协议，例如现有的SIP呼叫信令协议，或为特定应用程序定制的某种协议，可能是一个很新颖的用例。

在这种方法中，需要交换的关键信息是多媒体会话描述，它指定了建立媒体平面所需的必要传输和媒体配置信息。

考虑到这些考虑因素，本文档介绍了JavaScript会话建立协议（JSEP），该协议允许完全控制来自JavaScript的信令状态机。

如上所述，JSEP假定一个模型，其中JavaScript应用程序在包含WebRTC API的运行时内部执行（“ JSEP实现”）。
JSEP实现几乎完全脱离了核心信号流，而由Javascript使用两个接口来处理它：

1) 传递本地和远程会话描述，以及
2) 与ICE状态机进行交互。

本文档通篇将JSEP实现和JavaScript应用程序的组合称为“ JSEP端点”。

在本文档中，将JSEP的使用描述为始终在两个JSEP端点之间发生。请注意，尽管在许多情况下，它实际上是在JSEP端点和某种服务器（例如网关或MCU）之间。 JSEP端点看不到这种区别。它仅遵循通过API给出的说明。

JSEP的会话描述处理非常简单明了。每当需要 Offer/Answer 交换时，发起方都会通过调用 `createOffer()` API 创建 `Offer`。

然后，应用程序使用该 `Offer` 通过 `setLocalDescription()` API来设置其本地配置。offer 最终通过其首选的信令机制（例如WebSockets）发送到远程端；收到该 `offer` 后，远程方将使用 `setRemoteDescription()` API进行安置。

为了完成 Offer/Answer 交换，远程方使用 `createAnswer()` API生成适当的 `answer`，使用 `setLocalDescription()`API应用该`answer`，并将 `answer` 通过信令通道发送回发起方。启动器获得该`answer`后，它将使用 `setRemoteDescription()` API进行安装，并且初始设置已完成。可以重复此过程以进行其他 Offer/Answer 交换。

关于ICE [RFC8445]，由于 ICE 状态机必须保留在 JSEP 实现中，因此 JSEP 将 ICE 状态机与整个信令状态机分离，因为只有实现才具有候选者和其他传输信息的必要知识。执行此分离可在协议中提供额外的灵活性，从而使会话描述与传输脱钩。例如，在传统的 SIP 中，每个 Offer 或 Answer 都是独立的，包括会话描述和传输信息。但是，[ID.ietf-trickle-ice-sip] 允许 SIP 与 trick 流 ICE [ID.ietf-ice-trickle]一起使用，其中会话描述可以立即发送，而传输信息可以在可用的情况下发送。

分别发送传输信息可以加快 ICE 和 DTLS 的启动速度，因为 ICE 检查可以在任何传输信息可用时立即开始，而不必等待所有信息。 JSEP对ICE和信号状态机的解耦使其可以适应这两种模型。

通过对信令的抽象，JSEP方法确实要求应用程序了解信令过程。尽管应用程序不需要了解会话描述的内容即可建立呼叫，但应用程序必须在正确的时间调用正确的API，将会话描述和ICE信息转换为其选择的信令协议的已定义消息，然后执行从另一端收到的消息的反向转换。

使应用程序工作变得更轻松的一种方法是提供一个JavaScript库，该库对开发人员隐藏了这种复杂性。所述库将实现给定的信令协议及其状态机和序列化代码，为应用程序开发人员提供更高级别的面向调用的接口。例如，存在将JSEP API改编为适用于SIP或XMPP的API的库。因此，JSEP为有经验的开发人员提供了更大的控制权，而不会给新手开发人员带来任何额外的复杂性。

3. Semantics and Sytax

3.1 Signal Model

.. code-block::

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


3.2 Session Description and State machine 会话描述和状态机

