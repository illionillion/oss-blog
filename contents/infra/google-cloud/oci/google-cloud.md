---
title: Google Cloud で注意すべき開発ポイント
description: Google Cloud で注意すべき開発ポイントをまとめました。
keyword:
  - google cloud
contributors:
  - id: 78892525
    login: ageha734
    avatar_url: "https://avatars.githubusercontent.com/u/78892525?v=4"
    html_url: "https://github.com/ageha734"
slug: infra/google-cloud/oci/google-cloud
latest_date: "2024-09-19"
---

# Google Cloud で注意すべき開発ポイント

Google Cloud で注意すべき開発ポイントをまとめました。

## リージョンとゾーン

Google Cloud はリージョンとゾーンの概念があります。

- リージョン: データセンターがある地域
- ゾーン: データセンター内の物理的な場所

リージョンは複数のゾーンから構成されており、リージョン内のゾーン間でデータの複製が行われます。
