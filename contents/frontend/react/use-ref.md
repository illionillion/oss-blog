---
title: ReactのuseRefについて詳しく説明
description: ReactのuseRefについて詳しく説明
keyword:
  - React
  - useRef
  - TypeScript
contributors:
  - id: 60034520
    login: illionillion
    avatar_url: 'https://avatars.githubusercontent.com/u/60034520?v=4'
    html_url: 'https://github.com/illionillion'
  - id: 109452865
    login: taku10101
    avatar_url: 'https://avatars.githubusercontent.com/u/109452865?v=4'
    html_url: 'https://github.com/taku10101'
latest_date: '2024-09-14T15:05:25Z'
---

# Reactの`useRef`フックについて

`useRef`は、ReactでDOM要素やミュータブルな値を保持するためのフックです。このフックを使用することで、再レンダリングを発生させずにデータを参照・更新することが可能になります。例えば、DOMに直接アクセスしたり、以前の状態を保持する場合に便利です。

## 概要

以下に、`useRef`を使ってDOM要素にアクセスする例を示します。この例では、ボタンをクリックするたびに入力フィールドにフォーカスを当てます。

```tsx
import React, { useRef } from "react"

const App = () => {
  const inputRef = useRef(null)

  const focusInput = () => {
    // inputRef.currentに格納されているDOM要素にフォーカスを当てる
    inputRef.current.focus()
  }

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </>
  )
}

export default App
```

このコードでは、`useRef`を使って入力フィールドへの参照を取得し、ボタンをクリックするたびにそのフィールドにフォーカスを当てています。

## `useRef`とは？

`useRef`は、再レンダリングを引き起こさない参照を保持するためのフックです。通常、Reactの状態やプロパティの変更はコンポーネントの再レンダリングを引き起こしますが、`useRef`はこのルールに従いません。そのため、`useRef`を使って保持している値が更新されても、コンポーネントは再レンダリングされません。

### `useRef`の構文

```tsx
const refContainer = useRef(initialValue)
```

- `initialValue`: 参照の初期値を設定します。`useRef`は初回レンダリング時にのみこの値を設定し、それ以降は変更されません。
- `refContainer`: `current`プロパティを持つオブジェクトが返されます。この`current`に参照したい値やDOM要素を格納します。

### DOMへの直接アクセス

Reactでは、通常、仮想DOMを通じてDOMを操作しますが、`useRef`を使うと特定のDOM要素に直接アクセスできます。これは、フォーム要素へのフォーカスやメディアの再生制御など、特定の状況で必要になる場合があります。

```tsx
const inputRef = useRef(null)

useEffect(() => {
  inputRef.current.focus() // 初回レンダリング後に自動的にフォーカスを当てる
}, [])
```

上記の例では、コンポーネントがマウントされた直後に入力フィールドにフォーカスを当てています。

### ミュータブルな値の保持

`useRef`はDOM要素だけでなく、任意のミュータブルな値を保持するためにも使えます。この場合、`useRef`で保持した値が更新されても、再レンダリングは発生しません。

```tsx
const renderCount = useRef(0)

useEffect(() => {
  renderCount.current += 1
  console.log(`レンダリング回数: ${renderCount.current}`)
})
```

この例では、`renderCount`を使ってコンポーネントがレンダリングされた回数を数えています。`renderCount.current`の値が更新されても、コンポーネント自体は再レンダリングされません。

### 状態の保持と比較

`useRef`と`useState`の違いは、`useRef`は再レンダリングをトリガーしない点です。そのため、再レンダリングが不要な一時的なデータを保持する場合に適しています。逆に、UIに影響を与えるデータを保持する場合は、`useState`を使用するのが一般的です。

```tsx
const prevCountRef = useRef()

useEffect(() => {
  prevCountRef.current = count
}, [count])

const prevCount = prevCountRef.current
```

上記の例では、`count`の前回の値を保持し、現在の`count`と比較することができます。

## `useRef`の注意点

- **再レンダリングを発生させない**: `useRef`は、保持している値が更新されても再レンダリングを発生させないため、UIに反映させたい値には適していません。
- **参照の初期化に注意**: `useRef`の初期値は`null`や`undefined`であることが多いため、実際に使用する際には`current`が意図した値を持っているか確認する必要があります。

```tsx
const inputRef = useRef(null)

const handleClick = () => {
  if (inputRef.current) {
    inputRef.current.focus()
  }
}
```

このように、`current`が`null`でないことを確認してから使用することで、エラーを防ぐことができます。

## まとめ

`useRef`フックは、DOM要素やミュータブルな値を管理するための便利なツールです。再レンダリングを発生させずに参照を保持できるため、特定の場面でパフォーマンスを最適化するのに役立ちます。また、`useRef`を適切に使用することで、状態管理と参照管理を効率的に行うことが可能になります。
