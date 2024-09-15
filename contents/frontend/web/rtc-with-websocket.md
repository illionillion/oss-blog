---
title: Web開発でWebSocketを用いたRTCの実装方法
description: WebSocketを使用してRTC（リアルタイム通信）を実装する方法を解説します。
keyword:
  - WebSocket
  - RTC
  - リアルタイム通信
  - Web開発
contributors:
  - id: 56211510
    login: SEKI-YUTA
    avatar_url: "https://avatars.githubusercontent.com/u/56211510?v=4"
    html_url: "https://github.com/SEKI-YUTA"
  - id: 60034520
    login: illionillion
    avatar_url: "https://avatars.githubusercontent.com/u/60034520?v=4"
    html_url: "https://github.com/illionillion"
latest_date: "2024-09-15T08:13:26Z"
---

# Web開発でWebSocketを用いたRTCの実装方法

WebSocketとRTC（リアルタイム通信）は、双方向のデータ通信を実現するための重要な技術です。特に、チャットアプリやビデオ通話、リアルタイムデータストリーミングなどに活用されます。

## WebSocketの特徴

- **双方向通信**: WebSocketは、サーバーとクライアント間でリアルタイムの双方向通信を可能にします。
- **低レイテンシー**: WebSocketはHTTPに比べて低レイテンシーで、効率的なデータ送受信が可能です。
- **継続的な接続**: WebSocketは一度接続が確立されると、クライアントとサーバー間で継続的なデータ通信が可能になります。

## RTCの特徴

- **リアルタイム通信**: RTCは、リアルタイムで音声、ビデオ、データを送受信するための技術です。
- **Peer-to-Peer接続**: RTCは通常、サーバーを介さずにクライアント間で直接通信するPeer-to-Peer（P2P）接続をサポートします。
- **ストリーミング**: ビデオや音声のストリーミングを実現するために、RTCは重要な役割を果たします。

## WebSocketとRTCの実装手順

1. **WebSocketサーバーの構築**: WebSocketを利用するためには、まずサーバー側でWebSocketを設定します。Node.jsを使用して簡単に実装できます。

   ```js
   const WebSocket = require("ws")
   const wss = new WebSocket.Server({ port: 8080 })

   wss.on("connection", (ws) => {
     ws.on("message", (message) => {
       console.log("received: %s", message)
       ws.send("Hello from server")
     })
   })
   ```

2. **クライアントサイドのWebSocket接続**: クライアント側でもWebSocketを利用してサーバーに接続します。

   ```js
   const socket = new WebSocket("ws://localhost:8080")
   socket.onopen = () => {
     console.log("WebSocket is connected")
     socket.send("Hello Server")
   }
   socket.onmessage = (event) => {
     console.log("Message from server: ", event.data)
   }
   ```

3. **RTCの設定**: RTCを利用するためには、WebRTC APIを使用してPeer-to-Peer接続を確立します。次のコードは簡単なRTC接続の例です。

   ```js
   const peerConnection = new RTCPeerConnection()

   // Add media stream to the connection
   navigator.mediaDevices
     .getUserMedia({ video: true, audio: true })
     .then((stream) => {
       stream
         .getTracks()
         .forEach((track) => peerConnection.addTrack(track, stream))
     })

   // Create offer
   peerConnection
     .createOffer()
     .then((offer) => peerConnection.setLocalDescription(offer))
     .then(() => {
       // Send the offer to the remote peer via WebSocket
       socket.send(JSON.stringify({ offer: peerConnection.localDescription }))
     })
   ```

4. **データの送受信**: WebSocketを使用して、RTCのシグナリングデータを送受信します。これにより、クライアント間でPeer-to-Peer接続を確立します。

## まとめ

WebSocketとRTCを組み合わせることで、効率的かつ低レイテンシーのリアルタイム通信を実現できます。チャットアプリやビデオ通話、リアルタイムデータストリーミングなど、さまざまなアプリケーションに適用可能です。
