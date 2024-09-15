---
title: Angular Universalとは何か
description: Angular Universalの基本とその利点について解説します。
keyword:
  - Angular
  - Angular Universal
  - サーバーサイドレンダリング
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
slug: contents/frontend/web/explain-angular-universal.md
---

# Angular Universalとは何か

Angular Universalは、Angularアプリケーションをサーバーサイドでレンダリングするための技術です。これにより、通常のクライアントサイドレンダリングでは得られないパフォーマンスとSEOのメリットを得ることができます。

## サーバーサイドレンダリングの利点

Angular Universalを使う主な理由は、サーバーサイドレンダリング（SSR）の利点を活用するためです。SSRにより、以下の利点を得ることができます：

1. **SEOの向上**：クライアントサイドでレンダリングされるアプリケーションでは、検索エンジンがコンテンツを適切にインデックスできないことがあります。SSRでは、初期ページロード時に完全なHTMLが提供されるため、検索エンジンがコンテンツをより簡単にインデックスできます。
2. **パフォーマンスの改善**：ユーザーはサーバーでプリレンダリングされたページをすぐに受け取るため、初期表示速度が向上します。これにより、ユーザーエクスペリエンスが向上し、ページの離脱率が低下する可能性があります。
3. **ソーシャルメディアでのシェア**：SSRを使用すると、ソーシャルメディアプラットフォームでのリンクプレビューが向上します。OG（Open Graph）タグやTwitterカードなどのメタデータが正確に読み込まれ、適切なプレビューが表示されます。

## Angular Universalの実装

Angular Universalを使用するためには、Angularアプリケーションにいくつかの変更を加える必要があります。まず、Angular CLIを使用してプロジェクトにUniversalサポートを追加します：

```bash
ng add @nguniversal/express-engine
```

このコマンドは、サーバーサイドレンダリング用に必要な依存関係とファイルをプロジェクトに追加します。また、Expressを使用してAngularアプリケーションをホスティングするための基本的なセットアップも行います。

## ビルドとデプロイ

Angular Universalでアプリケーションをビルドするためには、`npm run build:ssr`コマンドを使用します。このコマンドは、クライアントサイドとサーバーサイドの両方のビルドを行い、`dist/`ディレクトリに成果物を生成します。

その後、アプリケーションを実行するために、`npm run serve:ssr`コマンドを使用します。これにより、Expressサーバーが起動し、サーバーサイドでレンダリングされたAngularアプリケーションが提供されます。

## まとめ

Angular Universalは、Angularアプリケーションにサーバーサイドレンダリングの機能を追加する強力なツールです。これにより、SEOの向上、パフォーマンスの改善、ソーシャルメディアでのシェアの最適化など、多くの利点を享受できます。
