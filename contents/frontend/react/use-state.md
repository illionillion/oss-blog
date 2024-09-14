---
title: ReactのuseStateについて詳しく説明
description: ReactのuseStateについて詳しく説明
keyword:
  - React
  - useState
  - TypeScript
contributors:
  - id: 60034520
    login: illionillion
    avatar_url: 'https://avatars.githubusercontent.com/u/60034520?v=4'
    html_url: 'https://github.com/illionillion'
latest_date: '2024-09-14T08:15:48Z'
---

# Reactの`useState`フックについて

`useState`は、Reactの中でも最も基本的でありながら強力なフックの一つです。コンポーネントの状態管理をシンプルに行うために使用されます。このフックを理解することは、React開発の基礎を築く上で非常に重要です。

## 概要

以下に、`useState`を使った簡単なカウンターアプリの例を示します。

```tsx
import React, { useState } from "react"

const App = () => {
  // count: 現在の状態、setCount: 状態を更新するための関数
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Count: {count}
      </button>
    </>
  )
}

export default App
```

このコードでは、`useState`を使ってボタンをクリックするたびにカウントが増加するシンプルなカウンターを実装しています。

## `useState`とは？

`useState`は、関数コンポーネントで状態を管理するためのフックです。状態（state）は、ユーザーインターフェースがインタラクションに応じて動的に変化するための重要な要素です。例えば、ユーザーがフォームに入力した内容や、ボタンのクリック回数などを状態として管理します。

### `useState`の構文

```tsx
const [state, setState] = useState(initialState)
```

- `state`: 現在の状態の値です。この値は、コンポーネントが再レンダリングされるたびに維持されます。
- `setState`: 状態を更新するための関数です。この関数を呼び出すと、コンポーネントが再レンダリングされ、新しい状態が反映されます。
- `initialState`: 状態の初期値です。この値は、コンポーネントが最初にレンダリングされるときにのみ使用されます。

### 状態の更新と再レンダリング

`useState`フックで取得した状態を更新する際は、`setState`関数を使用します。`setState`を呼び出すと、Reactはそのコンポーネントを再レンダリングし、新しい状態を反映したUIが表示されます。この再レンダリングは、効率的に行われるため、必要最小限の更新が行われます。

```tsx
<button onClick={() => setCount(count + 1)}>Increment</button>
```

上記のように、`setCount`関数を使って状態を更新しています。`count + 1`のように、新しい状態を計算し、その結果を`setCount`に渡します。

### 初期値と遅延初期化

`useState`の初期値は数値や文字列、オブジェクトなど任意のデータ型を指定できます。また、初期値の計算にコストがかかる場合、関数を渡すことで遅延初期化することも可能です。

```tsx
const [expensiveValue, setExpensiveValue] = useState(() =>
  computeExpensiveValue(),
)
```

このように書くと、`computeExpensiveValue`は最初のレンダリング時にのみ呼び出され、その結果が初期状態として使用されます。

## `useState`の制約と注意点

- `useState`は、関数コンポーネントの中で直接呼び出す必要があります。ループや条件分岐の中で呼び出すと、予期しない動作が発生する可能性があります。
- 複数の状態を管理する場合、`useState`を複数回呼び出すことができます。各状態は独立して管理され、必要な部分だけが再レンダリングされます。

```tsx
const [name, setName] = useState("")
const [age, setAge] = useState(0)
```

## まとめ

`useState`フックは、Reactで状態を管理するための最も基本的なツールです。状態管理はReactコンポーネントの中心的な役割を果たし、ユーザーインターフェースを動的に変化させるために不可欠です。`useState`を使いこなすことで、より複雑でインタラクティブなアプリケーションを構築することが可能になります。
