---
title: MVVMアーキテクチャでiOS開発をする（サンプル付き）
description: iOS開発におけるMVVMアーキテクチャの基本概念と、サンプルコードを使用した実装方法について解説します。
keyword:
  - MVVM
  - iOS
  - アーキテクチャ
  - Swift
  - 開発
contributors:
  - id: 56211510
    login: SEKI-YUTA
    avatar_url: "https://avatars.githubusercontent.com/u/56211510?v=4"
    html_url: "https://github.com/SEKI-YUTA"
  - id: 60034520
    login: illionillion
    avatar_url: "https://avatars.githubusercontent.com/u/60034520?v=4"
    html_url: "https://github.com/illionillion"
latest_date: "2024-09-15T08:13:26Z"
---

# MVVMアーキテクチャでiOS開発をする（サンプル付き）

MVVM（Model-View-ViewModel）は、iOSアプリケーション開発におけるアーキテクチャの一つで、コードの分離、再利用性の向上、テストの容易さなどを目的としています。本記事では、MVVMアーキテクチャの基本概念と、実際のサンプルコードを使用してMVVMをどのように実装するかを解説します。

## MVVMアーキテクチャとは

MVVMアーキテクチャは、Model、View、およびViewModelの3つのコンポーネントで構成されます。

- **Model**: アプリケーションのデータとビジネスロジックを表します。データの取得、保存、処理などを担当します。
- **View**: ユーザーインターフェース（UI）を表します。ユーザーとのインタラクションを担当し、ユーザーからの入力をViewModelに渡します。
- **ViewModel**: ViewとModelの仲介役で、Viewの状態を管理し、Modelから取得したデータをViewに提供します。ViewModelは、Viewのロジックを処理し、Viewにバインドするためのデータを保持します。

MVVMの主な目的は、ViewとModelの分離を実現し、コードの保守性とテストの容易さを向上させることです。

## MVVMの実装例

以下に、MVVMアーキテクチャを使用して、シンプルなiOSアプリを実装するサンプルコードを示します。この例では、ユーザーのリストを表示するためのアプリケーションを作成します。

### 1. Modelの定義

まず、ユーザーデータを表すModelを定義します。

```swift
struct User {
    let id: Int
    let name: String
}
```

### 2. ViewModelの作成

次に、ユーザーのリストを取得し、Viewに提供するためのViewModelを作成します。

```swift
import Foundation

class UserViewModel {
    private var users: [User] = []

    // データの更新を通知するためのクロージャ
    var didUpdateUsers: (() -> Void)?

    func fetchUsers() {
        // 仮のデータ取得処理
        self.users = [
            User(id: 1, name: "Alice"),
            User(id: 2, name: "Bob"),
            User(id: 3, name: "Charlie")
        ]

        // データが更新されたことを通知
        didUpdateUsers?()
    }

    func numberOfUsers() -> Int {
        return users.count
    }

    func user(at index: Int) -> User {
        return users[index]
    }
}
```

### 3. Viewの作成

最後に、ViewModelからデータを受け取り、ユーザーリストを表示するViewを作成します。

```swift
import UIKit

class UserListViewController: UIViewController, UITableViewDataSource {
    private let tableView = UITableView()
    private let viewModel = UserViewModel()

    override func viewDidLoad() {
        super.viewDidLoad()
        setupTableView()
        bindViewModel()
        viewModel.fetchUsers()
    }

    private func setupTableView() {
        tableView.dataSource = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
        tableView.frame = view.bounds
        view.addSubview(tableView)
    }

    private func bindViewModel() {
        viewModel.didUpdateUsers = { [weak self] in
            self?.tableView.reloadData()
        }
    }

    // MARK: - UITableViewDataSource

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return viewModel.numberOfUsers()
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        let user = viewModel.user(at: indexPath.row)
        cell.textLabel?.text = user.name
        return cell
    }
}
```

## MVVMの利点

- **コードの分離**: ViewとModelの分離により、ロジックがViewに埋め込まれず、コードの保守性が向上します。
- **再利用性**: ViewModelは、UIに依存しないため、再利用が容易です。
- **テストの容易さ**: ViewModelのロジックは、UIコンポーネントから独立しているため、ユニットテストが簡単に行えます。

## まとめ

MVVMアーキテクチャは、iOSアプリケーションの開発において、コードの構造を整理し、保守性とテストの効率を向上させるための効果的な方法です。本記事では、MVVMの基本概念とサンプルコードを通じて、MVVMアーキテクチャの実装方法を紹介しました。MVVMを適用することで、よりクリーンでメンテナンスしやすいアプリケーションを作成できるようになります。
