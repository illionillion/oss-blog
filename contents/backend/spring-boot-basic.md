---
title: Spring Bootの基本的な使い方
description: Spring Bootを使用したJavaアプリケーション開発の基本について解説します。プロジェクトのセットアップから簡単なREST APIの作成、アプリケーションの実行までの手順をサンプルコードを交えて紹介します。
keyword:
  - Spring Boot
  - Java
  - REST API
  - アプリケーション開発
contributors:
  - id: 56211510
    login: SEKI-YUTA
    avatar_url: "https://avatars.githubusercontent.com/u/56211510?v=4"
    html_url: "https://github.com/SEKI-YUTA"
latest_date: "2024-09-16T00:00:00Z"
---

## Spring Bootの基本的な使い方

### Spring Bootとは

Spring Bootは、Javaでのアプリケーション開発を簡素化するためのフレームワークです。Spring Frameworkを基盤としており、開発者が最低限の設定でアプリケーションを素早く構築できるように設計されています。Spring Bootは、組み込みサーバー（TomcatやJettyなど）をサポートしているため、独立したアプリケーションを簡単に作成できます。

### プロジェクトのセットアップ

Spring Bootプロジェクトをセットアップするために、Spring Initializrを使用します。Spring Initializrは、Webベースのツールで、必要な依存関係やプロジェクト構造を自動生成してくれます。

1. **Spring Initializrにアクセス**: [https://start.spring.io/](https://start.spring.io/) にアクセスします。
2. **プロジェクトの設定**: 必要なプロジェクトの設定を入力します。
   - Project: Maven Project
   - Language: Java
   - Spring Boot: 2.x.x (最新バージョンを選択)
   - Group: com.example
   - Artifact: my-spring-boot-app
   - Dependencies: Spring Web
3. **プロジェクトの生成**: [Generate]ボタンをクリックしてプロジェクトを生成し、ダウンロードします。
4. **プロジェクトのインポート**: ダウンロードしたプロジェクトをIDE（EclipseやIntelliJ IDEAなど）にインポートします。

### 簡単なREST APIの作成

Spring Bootを使用して、シンプルなREST APIを作成してみましょう。以下の例では、"Hello, World!"というメッセージを返すAPIを作成します。

#### 1. コントローラークラスの作成

`src/main/java/com/example/myspringbootapp`に`HelloController.java`という新しいクラスを作成します。

```java
package com.example.myspringbootapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }
}
```

このクラスでは、`@RestController`アノテーションを使用して、クラスがRESTコントローラーであることを指定しています。また、`@GetMapping`アノテーションを使用して、`/hello`エンドポイントに対するGETリクエストを処理するメソッドを定義しています。

#### 2. アプリケーションの実行

`src/main/java/com/example/myspringbootapp`にある`MySpringBootAppApplication.java`クラスを実行して、アプリケーションを起動します。Spring Bootは、デフォルトで組み込みのTomcatサーバーを使用してアプリケーションを起動します。

アプリケーションが正常に起動したら、ブラウザで`http://localhost:8080/hello`にアクセスします。すると、「Hello, World!」というメッセージが表示されます。

### まとめ

Spring Bootを使用すると、Javaでのアプリケーション開発が非常に簡単になります。Spring Frameworkの強力な機能を活用しつつ、設定やビルドの手間を大幅に削減できます。本記事では、Spring Bootの基本的な使い方として、プロジェクトのセットアップからシンプルなREST APIの作成までの流れを紹介しました。これを基に、さらに複雑なアプリケーション開発に挑戦してみてください。
