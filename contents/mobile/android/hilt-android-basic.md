---
title: Android開発におけるHiltの基本
description: Android開発における依存性注入をシンプルにするHiltの基本について解説します。Hiltを使って効率的で保守性の高いコードを作成しましょう。
keyword:
  - Android
  - Hilt
  - 依存性注入
  - DI
  - 開発
  - アプリ開発
contributors:
  - id: 56211510
    login: SEKI-YUTA
    avatar_url: "https://avatars.githubusercontent.com/u/56211510?v=4"
    html_url: "https://github.com/SEKI-YUTA"
latest_date: "2024-09-16T00:00:00Z"
---

# Android開発におけるHiltの基本

Hiltは、Androidアプリ開発における依存性注入（Dependency Injection, DI）をシンプルかつ効率的に行うためのライブラリです。依存性注入は、クラス間の依存関係を外部から提供することで、コードの再利用性とテスト性を向上させる設計パターンです。本記事では、Hiltの基本的な使い方とその利点について解説します。

## 1. Hiltとは

Hiltは、Daggerの上に構築されたDIフレームワークで、Android開発に特化した使いやすいAPIを提供します。Daggerは強力ですが、セットアップや使用が複雑になりがちです。一方、Hiltはその複雑さを軽減し、より直感的にDIを導入できるように設計されています。

## 2. Hiltのセットアップ

### Gradleへの依存関係の追加

Hiltを使用するには、まずプロジェクトの`build.gradle`にHiltの依存関係を追加します。

```gradle
// プロジェクトレベルのbuild.gradle
classpath 'com.google.dagger:hilt-android-gradle-plugin:2.x.x'

// アプリレベルのbuild.gradle
apply plugin: 'dagger.hilt.android.plugin'

dependencies {
    implementation "com.google.dagger:hilt-android:2.x.x"
    kapt "com.google.dagger:hilt-android-compiler:2.x.x"
}
```

### アプリケーションクラスのセットアップ

Hiltを使うには、アプリケーションクラスに`@HiltAndroidApp`アノテーションを追加する必要があります。

```kotlin
@HiltAndroidApp
class MyApplication : Application() {
}
```

## 3. Hiltの基本的な使い方

Hiltを使って依存性を注入するための基本的な流れを説明します。

### モジュールの定義

Hiltでは、依存性を提供するためのモジュールを定義します。モジュールは`@Module`アノテーションを持つクラスで、`@Provides`アノテーションを使って依存性を提供します。

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    fun provideRepository(): MyRepository {
        return MyRepositoryImpl()
    }
}
```

### コンストラクタインジェクション

Hiltは、コンストラクタインジェクションを使ってクラスに依存性を注入することができます。`@Inject`アノテーションをコンストラクタに追加するだけで、Hiltが必要な依存性を提供します。

```kotlin
class MyViewModel @Inject constructor(
    private val repository: MyRepository
) : ViewModel() {
    // ViewModelのロジック
}
```

### アクティビティとフラグメントへの注入

アクティビティやフラグメントに依存性を注入するためには、`@AndroidEntryPoint`アノテーションを追加します。

```kotlin
@AndroidEntryPoint
class MyActivity : AppCompatActivity() {
    @Inject lateinit var myViewModel: MyViewModel
}
```

## 4. Hiltを使うメリット

- **シンプルなAPI**: Hiltは、Daggerの強力な機能をシンプルで使いやすいAPIで提供します。
- **ライフサイクルのサポート**: Androidのライフサイクルに対応しており、適切なタイミングで依存性を提供します。
- **スコープの管理**: Hiltは、アプリケーションの異なる部分で適切なスコープを簡単に設定できます。

## まとめ

Hiltは、Android開発における依存性注入をシンプルにし、開発者が効率的に高品質なコードを書くのを支援します。Hiltを使うことで、コードの保守性やテスト性が向上し、アプリの品質を向上させることができます。ぜひHiltをプロジェクトに導入して、その利点を体感してみてください。
