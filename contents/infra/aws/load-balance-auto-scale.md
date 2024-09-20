---
title: AWSでロードバランシングとオートスケーリングをさせる
description: >-
  AWSのロードバランシングとオートスケーリングの基本について解説します。Elastic Load BalancingとAuto
  Scalingの設定方法、利用のメリット、ベストプラクティスを紹介します。
keyword:
  - AWS
  - ロードバランシング
  - オートスケーリング
  - Elastic Load Balancing
  - Auto Scaling
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
latest_date: "2024-09-19"
slug: infra/aws/load-balance-auto-scale
---

## AWSでロードバランシングとオートスケーリングをさせる

### ロードバランシングとは

ロードバランシングは、ネットワークトラフィックを複数のサーバーに分散させる技術です。これにより、システム全体の性能と可用性が向上し、単一障害点のリスクを軽減します。AWSでは、Elastic Load Balancing（ELB）というサービスを提供しており、リクエストを複数のターゲットに自動的に分散させることができます。

### オートスケーリングとは

オートスケーリングは、アプリケーションの需要に応じてインスタンスの数を自動的に増減させる機能です。AWSのAuto Scalingを使用すると、システムの負荷に応じてリソースを動的に調整し、コスト効率とパフォーマンスを最適化できます。

### Elastic Load Balancing（ELB）の種類

AWSのElastic Load Balancingには、以下の3つの主要な種類があります。

- **Application Load Balancer（ALB）**: OSI参照モデルの第7層で動作し、HTTP/HTTPSトラフィックに特化しています。パスベースやホストベースのルーティングが可能で、Webアプリケーションに適しています。
- **Network Load Balancer（NLB）**: OSI参照モデルの第4層で動作し、高いスループットと低レイテンシが求められるアプリケーションに適しています。TCP/UDPトラフィックを処理します。
- **Classic Load Balancer（CLB）**: 第4層と第7層で動作しますが、ALBとNLBに比べて機能が限定されています。既存のシステムに使用されることが多いです。

### ELBの設定方法

1. **ロードバランサーの作成**: AWS Management Consoleで「EC2」サービスを選択し、「ロードバランサー」をクリックします。「ロードバランサーの作成」ボタンをクリックし、ALB、NLB、CLBのいずれかを選択します。
2. **ターゲットグループの設定**: ターゲットグループは、ロードバランサーがリクエストを転送する先を定義します。インスタンス、IPアドレス、Lambda関数などをターゲットに設定できます。
3. **リスナーとルールの設定**: リスナーは、ロードバランサーが受け入れるプロトコルとポートを定義します。ALBの場合、リスナーにルールを設定して、パスやホスト名に基づいてリクエストを特定のターゲットグループに転送できます。

### Auto Scalingの設定方法

1. **Auto Scalingグループの作成**: AWS Management Consoleで「EC2」サービスを選択し、「Auto Scaling グループ」をクリックします。「Auto Scaling グループの作成」ボタンをクリックし、インスタンスの起動設定またはテンプレートを選択します。
2. **スケーリングポリシーの設定**: スケーリングポリシーでは、Auto Scalingがインスタンス数を増減する条件を定義します。スケジュールに基づくスケーリングや、CPU使用率などのメトリクスに基づくスケーリングが可能です。
3. **通知の設定**: スケーリングイベントに関する通知を受け取るために、Amazon SNSを使用して通知を設定することができます。

### ベストプラクティス

- **ヘルスチェックの設定**: ELBとAuto Scalingの両方でヘルスチェックを設定し、正常に動作していないインスタンスを自動的に切り離すようにします。
- **セキュリティグループの適切な設定**: ロードバランサーおよびインスタンスのセキュリティグループを適切に設定し、不正なアクセスを防ぎます。
- **スケーリングの検証**: スケーリングポリシーを適切にテストし、スケールアップとスケールダウンが期待通りに動作することを確認します。

### まとめ

AWSのElastic Load BalancingとAuto Scalingを使用することで、システムのパフォーマンスと可用性を向上させ、需要の変動に対応することが可能です。ロードバランサーの適切な設定とオートスケーリングの有効活用により、効率的で信頼性の高いシステムを構築できます。本記事では、AWSでのロードバランシングとオートスケーリングの基本的な設定方法とベストプラクティスについて解説しました。これを基に、AWSを使用したシステム設計と最適化に挑戦してみてください。
