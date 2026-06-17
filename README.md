# トレーニングログ

バドミントン競技者のジムトレーニングを記録するWebアプリ。

**アプリURL：** https://ynakagawacareer-web.github.io/training_log/

---

## 使い方

1. スマホでアプリURLにアクセス
2. 日付・種目・重量・レップ・セットを入力（最大15種目）
3. 「記録する」タップ → Google スプレッドシートに自動保存

---

## 構成

| 役割 | 使用技術 |
|---|---|
| フロントエンド | HTML / CSS / JavaScript（シングルファイル） |
| バックエンド API | Google Apps Script |
| データ保存 | Google スプレッドシート |
| ホスティング | GitHub Pages |

---

## ファイル

- `index.html` — 入力フォーム本体
- `gas_code.js` — Google Apps Script のコード（参照用）

---

## メンテナンス

**フォームを修正したい場合**
1. `index.html` を編集
2. GitHub Desktop でコミット → Push
3. 数分で反映

**スプレッドシートへの書き込みロジックを変えたい場合**
1. [Google Apps Script](https://script.google.com) を開く
2. `gas_code.js` の内容を参考に編集
3. 「デプロイ」→「デプロイを管理」→「編集」→ バージョンを「新しいバージョン」にして更新

---

## Claude との連携

スプレッドシートから直近2〜4週間分をコピーして Claude に貼り付け、以下のように依頼：

```
以下は直近のトレーニング記録です。
内容を踏まえて、次回のトレーニングメニューを提案してください。

[データを貼り付け]
```
