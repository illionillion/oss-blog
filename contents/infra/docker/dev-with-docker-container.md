---
title: Dockerを用いたコンテナ開発の基本
description: Dockerを使用したコンテナ開発の基本について解説します。コンテナの作成からイメージの管理、コンテナの実行までの手順を詳しく紹介します。
keyword:
  - Docker
  - コンテナ開発
  - イメージ管理
  - DevOps
contributors:
  - id: 60034520
    login: illionillion
    avatar_url: "https://avatars.githubusercontent.com/u/60034520?v=4"
    html_url: "https://github.com/illionillion"
  - id: 56211510
    login: SEKI-YUTA
    avatar_url: "https://avatars.githubusercontent.com/u/56211510?v=4"
    html_url: "https://github.com/SEKI-YUTA"
  - id: 109452865
    login: taku10101
    avatar_url: "https://avatars.githubusercontent.com/u/109452865?v=4"
    html_url: "https://github.com/taku10101"
latest_date: "2024-09-15"
---

## Dockerを用いたコンテナ開発の基本

### Dockerとは

Dockerは、アプリケーションをコンテナと呼ばれる軽量の仮想環境で実行するためのプラットフォームです。コンテナは、アプリケーションとその依存関係を一つのパッケージとしてまとめるため、開発環境と本番環境の違いによる問題を解消し、効率的なデプロイを可能にします。

### コンテナの作成

Dockerを使用してコンテナを作成する基本的な手順を見ていきましょう。

#### 1. Dockerfileの作成

Dockerfileは、コンテナのイメージを作成するための設定ファイルです。以下は、Node.jsアプリケーションのためのシンプルなDockerfileの例です。

```Dockerfile
# ベースイメージの指定
FROM node:14

# アプリケーションディレクトリの作成
WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# アプリケーションコードのコピー
COPY . .

# アプリケーションの実行
CMD ["node", "app.js"]
```

#### 2. イメージのビルド

Dockerfileが作成できたら、次にDockerイメージをビルドします。ターミナルで以下のコマンドを実行します。

```bash
docker build -t my-node-app .
```

このコマンドは、現在のディレクトリにあるDockerfileを使用して、`my-node-app`という名前のDockerイメージをビルドします。

#### 3. コンテナの実行

ビルドしたイメージをもとにコンテナを作成し、実行します。

```bash
docker run -p 3000:3000 my-node-app
```

このコマンドは、`my-node-app`イメージからコンテナを作成し、ローカルホストのポート3000でアプリケーションを実行します。

### イメージの管理

Dockerでは、ビルドしたイメージを管理するためのいくつかのコマンドが用意されています。

- **リストの表示**: `docker images`コマンドでローカルに存在するすべてのイメージを表示できます。
- **イメージの削除**: `docker rmi <イメージID>`コマンドで不要なイメージを削除できます。
- **イメージのプッシュ**: `docker push <リポジトリ>:<タグ>`コマンドでイメージをDocker Hubなどのリポジトリにプッシュし、他の環境で使用できるようにします。

### コンテナの操作

Dockerコンテナの操作には、以下のような基本的なコマンドが使用されます。

- **コンテナの停止**: `docker stop <コンテナID>`で実行中のコンテナを停止します。
- **コンテナの削除**: `docker rm <コンテナID>`で停止したコンテナを削除します。
- **ログの表示**: `docker logs <コンテナID>`でコンテナのログを表示します。

### まとめ

Dockerは、コンテナ技術を利用してアプリケーションの開発からデプロイまでを効率化する強力なツールです。本記事では、Dockerを使用したコンテナの作成、イメージのビルド、コンテナの実行と管理について解説しました。これらの基本を理解することで、より高度なコンテナ開発に取り組むことができます。Dockerを活用して、開発プロセスの効率化とアプリケーションの可搬性を向上させましょう。
