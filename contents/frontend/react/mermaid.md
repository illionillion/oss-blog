---
title: Mermaid埋め込み
description: Mermaid埋め込み
keyword:
  - React
  - useState
  - TypeScript
  - Mermaid
contributors:
  - id: 60034520
    login: illionillion
    avatar_url: 'https://avatars.githubusercontent.com/u/60034520?v=4'
    html_url: 'https://github.com/illionillion'
  - id: 109452865
    login: taku10101
    avatar_url: 'https://avatars.githubusercontent.com/u/109452865?v=4'
    html_url: 'https://github.com/taku10101'
latest_date: '2024-09-14T23:54:04Z'
---

```mermaid
flowchart TD
    A[CLI起動] --> B{/contents直下のフォルダか・新しいフォルダ作成を選択}
    B -->|新しいフォルダ作成を選択| C[フォルダ名入力]
    B -->|/contents直下のフォルダ選択| D{その選択したフォルダ直下のフォルダか、新しいフォルダを作成か記事作成かを選択}
    C --> D
    D -->|フォルダ選択| D
    D -->|フォルダ作成| C
    D -->|記事作成| E[記事名入力]
    E --> F[記事作成]
```
