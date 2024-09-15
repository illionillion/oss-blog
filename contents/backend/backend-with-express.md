---
title: Node.jsを使ったバックエンド開発（Express）
description: >-
  Node.jsとExpressを使用したバックエンド開発の基本について解説します。シンプルなAPIサーバーの構築からルーティングやミドルウェアの活用方法まで、具体的なサンプルコードを交えて紹介します。
keyword:
  - Node.js
  - Express
  - バックエンド開発
  - APIサーバー
contributors:
  - id: 60034520
    login: illionillion
    avatar_url: "https://avatars.githubusercontent.com/u/60034520?v=4"
    html_url: "https://github.com/illionillion"
  - id: 56211510
    login: SEKI-YUTA
    avatar_url: "https://avatars.githubusercontent.com/u/56211510?v=4"
    html_url: "https://github.com/SEKI-YUTA"
latest_date: "2024-09-15"
---

## Node.jsを使ったバックエンド開発（Express）

### Node.jsとExpressとは

Node.jsは、サーバーサイドのJavaScript実行環境であり、非同期イベント駆動モデルを採用しています。これにより、高速でスケーラブルなネットワークアプリケーションを構築することができます。一方、ExpressはNode.jsのための軽量なWebアプリケーションフレームワークで、シンプルなAPIを提供し、ルーティングやミドルウェアの管理を容易にします。

### Expressを使ったシンプルなAPIサーバーの構築

以下は、Expressを使用してシンプルなAPIサーバーを構築する例です。

#### 1. プロジェクトのセットアップ

まず、Node.jsプロジェクトを作成し、Expressをインストールします。

```bash
mkdir my-express-app
cd my-express-app
npm init -y
npm install express
```

#### 2. サーバーの作成

次に、`index.js`というファイルを作成し、基本的なサーバーをセットアップします。

```javascript
const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
```

このコードでは、Expressを使用してHTTP GETリクエストを処理するシンプルなサーバーを作成しています。`app.get()`メソッドを使用して、ルートパス（"/"）へのリクエストに対してレスポンスを返します。

#### 3. サーバーの起動

ターミナルで以下のコマンドを実行し、サーバーを起動します。

```bash
node index.js
```

ブラウザで`http://localhost:3000`にアクセスすると、「Hello World!」と表示されます。

### ルーティング

Expressでは、`app.get()`、`app.post()`、`app.put()`、`app.delete()`などのメソッドを使用して、さまざまなHTTPリクエストに対するルーティングを設定できます。

```javascript
app.get("/users", (req, res) => {
  res.send("GET request to /users")
})

app.post("/users", (req, res) => {
  res.send("POST request to /users")
})
```

この例では、`/users`エンドポイントに対するGETおよびPOSTリクエストを処理しています。

### ミドルウェアの活用

ミドルウェアは、リクエストとレスポンスの処理の間に実行される関数です。Expressでは、`app.use()`メソッドを使用してミドルウェアを追加できます。

```javascript
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
}

app.use(logger)
```

この例では、リクエストのメソッドとURLをログに出力するシンプルなロガーミドルウェアを作成しています。

### まとめ

Node.jsとExpressを使用すると、シンプルかつ効率的なバックエンドAPIサーバーを迅速に構築することができます。Expressのルーティングやミドルウェアの活用により、柔軟で拡張性のあるアプリケーションを開発することが可能です。本記事では、基本的なサーバーのセットアップからルーティング、ミドルウェアの利用までを紹介しました。これを基に、さらに高度なバックエンド開発に挑戦してみてください。
