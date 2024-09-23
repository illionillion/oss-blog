---
title: ReactのuseEffectについて詳しく説明
description: ReactのuseEffectについて詳しく説明
keyword:
  - React
  - useEffect
  - TypeScript
contributors:
  - id: 60034520
    login: illionillion
    avatar_url: "https://avatars.githubusercontent.com/u/60034520?v=4"
    html_url: "https://github.com/illionillion"
  - id: 109452865
    login: taku10101
    avatar_url: "https://avatars.githubusercontent.com/u/109452865?v=4"
    html_url: "https://github.com/taku10101"
latest_date: "2024-09-19"
slug: frontend/react/use-effect
---

# Reactの`useEffect`フックについて

`useEffect`は、Reactで副作用を扱うためのフックです。コンポーネントが描画されるたびに何かしらの処理を実行したい場合や、クリーンアップ処理が必要な場合に使用されます。副作用とは、例えばデータの取得やDOMの操作、タイマーの設定など、レンダリング以外の処理を指します。

## 概要

以下に、`useEffect`を使った例を示します。この例では、コンポーネントがマウントされたときにデータを取得し、コンポーネントがアンマウントされる際にクリーンアップを行います。

```tsx
import React, { useState, useEffect } from "react"

const App = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    // コンポーネントがマウントされたときにデータを取得
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((data) => setData(data))

    // コンポーネントがアンマウントされるときにクリーンアップ
    return () => {
      console.log("クリーンアップ処理")
    }
  }, []) // 依存配列が空のため、最初のマウント時にのみ実行される

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  )
}

export default App
```

このコードでは、`useEffect`を使ってAPIからデータを取得し、データが取得されたらそれを表示しています。また、コンポーネントがアンマウントされるときにクリーンアップ処理を行っています。

## `useEffect`とは？

`useEffect`は、副作用（サイドエフェクト）を処理するためのフックです。Reactのコンポーネントは、レンダリングの結果に基づいてUIを更新しますが、そのプロセスの中で外部のデータやブラウザのAPIにアクセスする必要がある場合があります。こうした操作を行う場所が`useEffect`です。

### `useEffect`の構文

```tsx
useEffect(() => {
  // 副作用の処理を記述
  return () => {
    // クリーンアップ処理を記述
  }
}, [依存配列])
```

- 第一引数：副作用を記述するための関数を渡します。この関数内で、データの取得やイベントリスナーの設定などを行います。
- 第二引数：依存配列です。この配列内に指定した変数に変化があった場合のみ、再度副作用が実行されます。依存配列を空にすると、コンポーネントのマウント時に一度だけ実行されます。

### コンポーネントのライフサイクルとの関係

`useEffect`は、コンポーネントのライフサイクルに密接に関連しています。具体的には、以下のタイミングで呼び出されます：

1. **マウント時**: コンポーネントが最初にDOMに追加された直後に呼び出されます。
2. **更新時**: 依存配列内の値が変化したときに呼び出されます。
3. **アンマウント時**: コンポーネントがDOMから削除される直前にクリーンアップ関数が呼び出されます。

### 依存配列の使い方

`useEffect`の第二引数として依存配列を渡すことで、どのタイミングで副作用を実行するかを制御できます。

- **空の依存配列**: 副作用は一度だけ実行されます。通常、コンポーネントがマウントされた直後に実行されます。

  ```tsx
  useEffect(() => {
    // 初回レンダリング時にのみ実行
  }, [])
  ```

- **特定の依存変数**: 依存配列に指定した変数が変化するたびに副作用が再実行されます。

  ```tsx
  useEffect(() => {
    // `count`が変更されるたびに実行
  }, [count])
  ```

### クリーンアップ処理

クリーンアップ処理は、コンポーネントがアンマウントされる直前に実行される処理です。例えば、タイマーのクリアやイベントリスナーの解除、WebSocketの接続解除などが必要な場合に使います。

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("タイマー実行中")
  }, 1000)

  return () => {
    clearInterval(timer) // タイマーのクリア
    console.log("タイマーがクリアされました")
  }
}, [])
```

この例では、コンポーネントがアンマウントされるときに`clearInterval`でタイマーを解除しています。

## `useEffect`の注意点

- **依存配列を正確に管理**: 依存配列を正しく設定しないと、無限ループに陥る可能性があります。すべての依存する変数を配列に含めるようにしましょう。
- **副作用の分割**: 複数の副作用を一つの`useEffect`にまとめると、コードが複雑になります。関連する処理ごとに`useEffect`を分割すると読みやすくなります。

```tsx
useEffect(() => {
  // データ取得
}, [url])

useEffect(() => {
  // イベントリスナーの設定
  return () => {
    // イベントリスナーの解除
  }
}, [])
```

## まとめ

`useEffect`フックは、Reactコンポーネントにおいて副作用を扱うための非常に重要なツールです。コンポーネントのライフサイクルに沿った処理を簡潔に記述でき、クリーンアップ処理も容易に管理できます。正しく使用することで、Reactアプリケーションの品質と安定性を大幅に向上させることができます。
