---
title: iOS開発のCore Dataの基本的な使い方について
description: iOS開発におけるCore Dataの基礎とその活用法を解説します。
keyword:
  - Core Data
  - iOS
  - データベース
  - Swift
  - Apple
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
slug: mobile/ios/ios-core-data
---

# iOS開発のCore Dataの基本的な使い方について

Core Dataは、iOSアプリケーションでオブジェクトの永続化と管理を行うためのフレームワークです。データの保存、検索、編集、削除などの操作を効率的に行うことができます。本記事では、Core Dataの基本的な使い方とそのメリットについて解説します。

## Core Dataとは

Core Dataは、Appleが提供するオブジェクトグラフおよび永続化フレームワークで、アプリケーションデータの管理をサポートします。データの保存先としては、SQLiteデータベースを使用しますが、開発者は直接SQLクエリを書く必要はなく、オブジェクト指向のAPIを使ってデータを操作できます。

## Core Dataの基本構造

Core Dataの主要なコンポーネントは以下のとおりです。

### 1. NSManagedObject

`NSManagedObject`は、Core Dataで管理されるオブジェクトの基本クラスです。データモデルで定義したエンティティに対応するクラスで、Core Dataを使用してデータを保存、取得、削除するために使用します。

### 2. NSPersistentContainer

`NSPersistentContainer`は、Core Dataスタック全体を管理するための便利なクラスです。このクラスは、データモデルをロードし、永続ストアを作成し、`NSManagedObjectContext`を提供します。通常、アプリケーションの起動時にこのコンテナをセットアップします。

### 3. NSManagedObjectContext

`NSManagedObjectContext`は、Core Dataオブジェクトの操作を行うための作業領域です。データのフェッチ、挿入、削除、更新などの操作を行うために使用します。`NSManagedObjectContext`で行った変更は、`save()`メソッドを呼び出すことで永続ストアに保存されます。

### 4. NSEntityDescription

`NSEntityDescription`は、Core Dataモデルのエンティティを表します。エンティティは、データベースのテーブルに相当し、エンティティ内の各プロパティはテーブルのカラムに対応します。

## Core Dataの基本的な使い方

以下に、Core Dataを使用して簡単なデータの保存とフェッチを行う例を示します。

### 1. データモデルの作成

Xcodeで新しいデータモデルを作成し、エンティティとその属性を定義します。例えば、`Person`というエンティティを作成し、`name`と`age`という属性を追加します。

### 2. データの保存

```swift
import UIKit
import CoreData

class ViewController: UIViewController {

    let persistentContainer: NSPersistentContainer = {
        let container = NSPersistentContainer(name: "MyAppModel")
        container.loadPersistentStores(completionHandler: { (storeDescription, error) in
            if let error = error as NSError? {
                fatalError("Unresolved error \(error), \(error.userInfo)")
            }
        })
        return container
    }()

    override func viewDidLoad() {
        super.viewDidLoad()

        savePerson(name: "John", age: 30)
    }

    func savePerson(name: String, age: Int) {
        let context = persistentContainer.viewContext
        let person = Person(context: context)
        person.name = name
        person.age = Int16(age)

        do {
            try context.save()
        } catch {
            print("Failed to save person: \(error)")
        }
    }
}
```

### 3. データのフェッチ

```swift
func fetchPeople() -> [Person] {
    let context = persistentContainer.viewContext
    let fetchRequest: NSFetchRequest<Person> = Person.fetchRequest()

    do {
        let people = try context.fetch(fetchRequest)
        return people
    } catch {
        print("Failed to fetch people: \(error)")
        return []
    }
}
```

この例では、`NSPersistentContainer`を使用してCore Dataスタックをセットアップし、データを保存およびフェッチしています。

## Core Dataの利点

- **オブジェクト指向**: Core Dataはオブジェクト指向のデータベース操作を可能にし、データモデルを直感的に扱うことができます。
- **効率的なデータ操作**: Core Dataは、大量のデータに対する効率的なフェッチおよびメモリ管理をサポートします。
- **自動的な保存**: `NSManagedObjectContext`の変更を保存することで、データを自動的に永続化できます。

## まとめ

Core Dataは、iOSアプリケーションでデータを永続化し、効率的に管理するための強力なフレームワークです。`NSManagedObject`、`NSPersistentContainer`、`NSManagedObjectContext`などの基本コンポーネントを理解することで、アプリケーションのデータ操作を簡単かつ効果的に行うことができます。Core Dataを活用して、ユーザーに優れたデータ管理体験を提供するiOSアプリを開発しましょう。
