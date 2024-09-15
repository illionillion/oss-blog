---
title: Android開発のJetpack Composeの基本
description: Jetpack Composeを使ったAndroid UI開発の基本について解説します。宣言的UIフレームワークの利点と使い方を学びましょう。
keyword:
  - Android
  - Jetpack Compose
  - UI開発
  - 宣言的UI
  - アプリ開発
  - Kotlin
contributors:
  - id: 56211510
    login: SEKI-YUTA
    avatar_url: "https://avatars.githubusercontent.com/u/56211510?v=4"
    html_url: "https://github.com/SEKI-YUTA"
latest_date: "2024-09-15T02:18:55Z"
---

# Android開発のJetpack Composeの基本

Jetpack Composeは、AndroidアプリケーションのUIを構築するための最新の宣言的UIフレームワークです。従来のXMLベースのUI開発から脱却し、KotlinコードのみでUIを構築できるComposeは、開発者にとって直感的で強力なツールとなります。本記事では、Jetpack Composeの基本と、その利点について解説します。

## 1. Jetpack Composeとは

Jetpack Composeは、UIを簡潔で理解しやすいコードで作成できるようにするためのフレームワークです。従来のビューシステムとは異なり、ComposeではUIをコードで記述し、データの変化に応じてUIを自動的に更新します。

## 2. Jetpack Composeのセットアップ

### Gradleへの依存関係の追加

Composeを使うためには、プロジェクトの`build.gradle`に必要な依存関係を追加する必要があります。

```gradle
dependencies {
    implementation "androidx.compose.ui:ui:1.x.x"
    implementation "androidx.compose.material:material:1.x.x"
    implementation "androidx.compose.ui:ui-tooling-preview:1.x.x"
    // その他の依存関係
}
```

また、Kotlinコンパイラのバージョンが1.5.0以上であることを確認してください。

### Android Studioでのサポート

Jetpack Composeは、最新のAndroid Studioでサポートされており、リアルタイムプレビューやデバッグ機能を利用できます。開発環境を最新のバージョンにアップデートしておくと良いでしょう。

## 3. 基本的なコンポーネントの使用

Jetpack Composeの基本的なUIコンポーネントを使用する方法をいくつか紹介します。

### Text

テキストを表示するには、`Text`コンポーネントを使用します。

```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}
```

### Button

ボタンを作成するには、`Button`コンポーネントを使用します。

```kotlin
@Composable
fun MyButton() {
    Button(onClick = { /* ボタンがクリックされたときの処理 */ }) {
        Text("Click me")
    }
}
```

### ColumnとRow

レイアウトを整えるために、`Column`と`Row`を使用してコンポーネントを垂直または水平に配置できます。

```kotlin
@Composable
fun MyColumn() {
    Column {
        Text("Item 1")
        Text("Item 2")
    }
}
```

## 4. 状態管理

Jetpack Composeでは、状態（State）を管理するための仕組みが用意されています。`remember`と`mutableStateOf`を使って状態を保持し、UIを更新できます。

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Column {
        Text("Count: $count")
        Button(onClick = { count++ }) {
            Text("Increment")
        }
    }
}
```

## 5. Jetpack Composeのメリット

- **宣言的UI**: UIを状態に基づいて宣言的に定義できるため、コードがシンプルで明確になります。
- **リアクティブなUI更新**: データの変化に応じて自動的にUIが更新されるため、バグを減らし、保守性が向上します。
- **Kotlinとの統合**: ComposeはKotlinで記述されており、最新のKotlinの機能を最大限に活用できます。

## まとめ

Jetpack Composeは、AndroidのUI開発における次世代のツールです。その宣言的アプローチと直感的なAPIにより、UIの構築とメンテナンスが大幅に簡素化されます。Composeを使って、より効率的で洗練されたAndroidアプリを作成してみましょう。
