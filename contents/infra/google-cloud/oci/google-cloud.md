---
title: Google Cloud で注意すべき開発ポイント
description: Google Cloud で注意すべき開発ポイントをまとめました。
keyword:
  - "google cloud" # キーワード
---

# Google Cloud で注意すべき開発ポイント

Google Cloud で注意すべき開発ポイントをまとめました。

## リージョンとゾーン

Google Cloud はリージョンとゾーンの概念があります。

- リージョン: データセンターがある地域
- ゾーン: データセンター内の物理的な場所

リージョンは複数のゾーンから構成されており、リージョン内のゾーン間でデータの複製が行われます。
