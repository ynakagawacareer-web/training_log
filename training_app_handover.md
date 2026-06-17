# トレーニングログ Web アプリ 引き継ぎ書

> 作成日：2026年6月17日  
> 最終更新：2026年6月17日（構築完了）

---

## 1. このプロジェクトの目的

バドミントン競技者（ナカガワ）のジムトレーニングを記録・管理し、Claude が過去データを読み込んで次回メニューを提案するシステム。

---

## 2. 現在の状態（構築済み）

| 項目 | 状態 | 詳細 |
|---|---|---|
| Web アプリ | ✅ 公開済み | https://ynakagawacareer-web.github.io/training_log/ |
| GitHub リポジトリ | ✅ 公開済み | https://github.com/ynakagawacareer-web/training_log |
| Google Apps Script | ✅ デプロイ済み | スプレッドシートへの書き込みAPI |
| GitHub Pages | ✅ 有効 | main ブランチ / /(root) |

---

## 3. 全体アーキテクチャ

```
[Web アプリ（index.html）]
　　↓ フォーム送信（fetch POST）
[Google Apps Script API]
　　↓ データ書き込み
[Google スプレッドシート]
　　↓ データをコピー or CSV エクスポートして渡す
[Claude（claude.ai）]
　　↓ 分析・次回メニュー提案
```

---

## 4. 技術スタック

| 役割 | 使用技術 |
|---|---|
| フロントエンド | HTML / CSS / JavaScript（シングルファイル） |
| バックエンド API | Google Apps Script |
| データ保存 | Google スプレッドシート |
| ホスティング | GitHub Pages |
| バージョン管理 | GitHub Desktop |
| AI 分析 | Claude（claude.ai） |

---

## 5. ファイル構成

```
training_log/
├── index.html              # 入力フォーム本体
├── gas_code.js             # Google Apps Script のコード（参照用）
├── README.md               # リポジトリ説明
└── training_app_handover.md  # このファイル
```

---

## 6. 入力フォームの仕様（index.html）

- 日付（必須）
- 種目ごとに「種目名 / 重量(kg) / レップ数 / セット数」を1行で入力
- 最大15種目まで登録可能（「＋ 種目を追加」ボタン）
- 自由メモ
- 送信時：種目名が空の行は自動スキップ

---

## 7. Google Apps Script

**エンドポイント URL：**
```
https://script.google.com/macros/s/AKfycbyIqZxaDVpdDpueRaOeH8qaJwOR5dLhSfHxHNyopo4aglqrn_ocJYsznbNzv7rrpbnBsQ/exec
```

**スプレッドシートの列構成（シート名：ログ）**

| 列 | 内容 |
|---|---|
| A | 記録日時（自動） |
| B | 日付 |
| C | No（同一セッション内の種目順） |
| D | 種目名 |
| E | 重量(kg) |
| F | レップ数 |
| G | セット数 |
| H | メモ（1行目のみ） |

---

## 8. メンテナンス手順

### フォームを修正したい場合
1. `index.html` を編集（Cowork の Claude に依頼するのが楽）
2. GitHub Desktop でコミット → Push
3. 数分で反映

### GAS のロジックを変更したい場合
1. https://script.google.com を開く
2. 該当プロジェクトを選択
3. コードを編集
4. 「デプロイ」→「デプロイを管理」→「編集」→ バージョンを「新しいバージョン」にして更新
   ※ URL は変わらない

### 別の PC で作業を引き継ぐ場合
1. GitHub Desktop をインストール
2. `https://github.com/ynakagawacareer-web/training_log` を Clone
3. Cowork でこのフォルダを開けばすぐ再開できる

---

## 9. Claude との連携（運用フロー）

1. Google スプレッドシートを開く
2. 直近 2〜4 週間分のデータを選択してコピー
3. Claude（claude.ai）に貼り付けて依頼：

```
以下は直近のトレーニング記録です。
内容を踏まえて、次回のトレーニングメニューを提案してください。

[データを貼り付け]
```

---

## 10. 今後の拡張アイデア（優先度低）

- [ ] グラフ表示（重量推移など）
- [ ] PWA 化（ホーム画面に追加してアプリっぽく使う）
- [ ] Claude API を直接呼び出してアプリ内でメニュー提案を表示

---

## 11. 注意事項

- GAS のエンドポイントは「全員（匿名を含む）」アクセス可に設定済み
- GitHub リポジトリは Public（GitHub Pages 無料利用のため）
- API キーなどのセンシティブな情報は HTML に書かない

---

*以上*
