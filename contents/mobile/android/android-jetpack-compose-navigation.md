---
title: Android開発のJetpack Composeでの画面遷移の基本
description: >-
  Jetpack
  Composeを使用したAndroidアプリの画面遷移の基本について解説します。ナビゲーションコンポーネントを使って効率的な画面遷移を実装する方法を学びましょう。
keyword:
  - Android
  - Jetpack Compose
  - 画面遷移
  - ナビゲーション
  - アプリ開発
  - Kotlin
contributors:
  - id: 56211510
    login: SEKI-YUTA
    avatar_url: "https://avatars.githubusercontent.com/u/56211510?v=4"
    html_url: "https://github.com/SEKI-YUTA"
latest_date: "2024-09-15T02:18:55Z"
---

# Android開発のJetpack Composeでの画面遷移の基本

Jetpack Composeは、AndroidのUI開発を簡素化するだけでなく、画面遷移の実装もシンプルにします。Jetpack Composeのナビゲーションコンポーネントを使用すると、画面間の遷移を直感的に管理できます。本記事では、Jetpack Composeでの画面遷移の基本について解説します。

## 1. Jetpack Composeのナビゲーションとは

Jetpack Composeのナビゲーションは、アプリ内の異なる画面をスムーズに遷移するためのフレームワークです。これにより、コードが読みやすく、メンテナンスしやすくなります。

### ナビゲーションコンポーネントの利点

- **シンプルなAPI**: 画面遷移を簡単に実装できる直感的なAPIを提供します。
- **タイプセーフな遷移**: パラメータを伴う遷移をタイプセーフに行うことができます。
- **ライフサイクル管理**: ナビゲーションにより、画面のライフサイクルを適切に管理できます。

## 2. Jetpack Composeナビゲーションのセットアップ

### Gradleへの依存関係の追加

まず、プロジェクトの`build.gradle`ファイルにナビゲーションの依存関係を追加します。

```gradle
dependencies {
    implementation "androidx.navigation:navigation-compose:2.x.x"
}
```

### 基本的なナビゲーションの設定

Composeでナビゲーションを行うには、`NavController`と`NavHost`を使用します。`NavController`は現在の画面を制御し、`NavHost`は画面遷移のルートを定義します。

```kotlin
val navController = rememberNavController()

NavHost(navController, startDestination = "home") {
    composable("home") { HomeScreen(navController) }
    composable("details") { DetailsScreen(navController) }
}
```

## 3. 画面遷移の実装

### 画面間の遷移

画面遷移を行うには、`NavController`の`navigate`メソッドを使用します。

```kotlin
@Composable
fun HomeScreen(navController: NavController) {
    Button(onClick = {
        navController.navigate("details")
    }) {
        Text("Go to Details")
    }
}
```

### パラメータ付きの遷移

パラメータを渡して画面遷移を行うことも可能です。遷移先の画面でパラメータを受け取るには、`composable`の引数に指定します。

```kotlin
NavHost(navController, startDestination = "home") {
    composable("home") { HomeScreen(navController) }
    composable("details/{itemId}") { backStackEntry ->
        DetailsScreen(itemId = backStackEntry.arguments?.getString("itemId"))
    }
}

navController.navigate("details/${item.id}")
```

## 4. Jetpack Composeでのナビゲーションの注意点

- **バックスタックの管理**: Composeのナビゲーションはバックスタックを自動的に管理します。`popBackStack`を使用して、前の画面に戻ることができます。
- **ナビゲーションの構成**: アプリケーションの画面構成が複雑になる場合、ナビゲーショングラフを使用して構成を整理することが推奨されます。

## 5. Jetpack Composeナビゲーションのメリット

- **効率的な画面遷移**: ナビゲーションコンポーネントを使用すると、画面遷移が効率的に行え、コードの冗長性が減ります。
- **一貫性のあるUI**: 一貫性のある画面遷移を実現し、ユーザーエクスペリエンスを向上させます。
- **開発のスピードアップ**: ナビゲーションの実装が簡単になるため、開発のスピードが向上します。

## まとめ

Jetpack Composeのナビゲーションコンポーネントを使用すると、Androidアプリの画面遷移をシンプルかつ効率的に実装できます。これにより、アプリの構造が整理され、ユーザーエクスペリエンスを向上させることができます。ぜひ、Jetpack Composeのナビゲーションを活用して、より洗練されたアプリを開発しましょう。
