# Portfolio - Web Projects Showcase

動きのある美しいポートフォリオサイトです。開発したWebサイトのリンク集を、アニメーション付きのかっこいいデザインで表示します。

## 特徴

- 🌟 星空の背景アニメーション
- 🎨 グラデーションとグローエフェクト
- 💫 3Dホバーエフェクト
- 📱 レスポンシブデザイン
- 🎯 JSONファイルで簡単に管理
- ⚡ スムーズなアニメーション

## デプロイ

このプロジェクトはGitHub Pagesで自動デプロイされます。

- `main`ブランチへのpushで自動的にデプロイが実行されます
- PRが`main`ブランチにマージされた際も自動デプロイされます
- GitHub Actionsによる自動デプロイが設定済みです

デプロイ状況は、リポジトリの「Actions」タブから確認できます。

## 使い方

### 1. サイト情報の編集

`sites.json` ファイルを編集して、あなたのプロジェクト情報を追加してください：

```json
[
  {
    "name": "プロジェクト名",
    "url": "https://example.com/your-site",
    "repository": "https://github.com/username/repository",
    "description": "プロジェクトの説明をここに記述します。"
  }
]
```

### 2. ブラウザで開く

`index.html` をブラウザで開くだけで、ポートフォリオサイトが表示されます。

### 3. カスタマイズ

- `style.css`: 色やアニメーションをカスタマイズ
- `script.js`: 機能の追加や変更
- `index.html`: タイトルや構造の変更

## ファイル構成

```
.
├── index.html      # メインHTMLファイル
├── style.css       # スタイルシートとアニメーション
├── script.js       # JSONの読み込みと表示ロジック
└── sites.json      # プロジェクト情報のデータ
```

## ブラウザ対応

- Chrome (推奨)
- Firefox
- Safari
- Edge

## ライセンス

MIT License