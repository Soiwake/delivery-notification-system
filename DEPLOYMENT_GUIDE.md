# 🚀 デプロイガイド

## 現在のプロジェクト情報
- **プロジェクト名**: delivery-notification-system
- **GitHub**: https://github.com/soiwake/delivery-notification-system.git
- **本番URL**: https://delivery-notification-system.vercel.app
- **Vercelダッシュボード**: https://vercel.com/soiwake-1330s-projects/delivery-notification-system

## 📝 日常的な開発フロー

### 1. ローカル開発
```bash
npm run dev
# http://localhost:3000 で開発サーバー起動
```

### 2. 変更をデプロイ
```bash
# 変更をステージング
git add .

# コミット
git commit -m "変更内容の説明"

# GitHubにプッシュ（自動でデプロイ）
git push origin main
```

### 3. デプロイ確認
- **本番環境**: https://delivery-notification-system.vercel.app
- **Vercelダッシュボード**: https://vercel.com/soiwake-1330s-projects/delivery-notification-system

## 🔧 手動デプロイ（必要な場合）

### プレビューデプロイ
```bash
vercel
```

### 本番デプロイ
```bash
vercel --prod
```

## 🆕 新しいプロジェクトで同じ設定をする場合

### 1. プロジェクト準備
```bash
# Next.jsプロジェクト作成
npx create-next-app@latest project-name
cd project-name

# または既存プロジェクト
cd existing-project
```

### 2. GitHub設定
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

### 3. Vercel設定
```bash
# Vercel CLIインストール（初回のみ）
npm install -g vercel

# プロジェクト接続
vercel

# 本番デプロイ
vercel --prod
```

## 📊 デプロイ状況確認

### Vercelダッシュボード
- デプロイ履歴
- パフォーマンス統計
- エラーログ
- 環境変数設定

### コマンドライン
```bash
# プロジェクト情報確認
vercel ls

# デプロイ履歴確認
vercel ls --scope=soiwake-1330s-projects
```

## ⚠️ 注意事項

1. **環境変数**: 本番環境で必要な環境変数はVercelダッシュボードで設定
2. **ビルドエラー**: ローカルで `npm run build` を実行して事前確認
3. **依存関係**: `package.json` の依存関係が正しく設定されていることを確認

## 🆘 トラブルシューティング

### デプロイが失敗する場合
1. ローカルで `npm run build` を実行
2. エラーログを確認
3. 依存関係の問題を修正
4. 再度プッシュ

### Vercel CLIでエラーが出る場合
```bash
# Vercel CLI再インストール
npm uninstall -g vercel
npm install -g vercel

# 再ログイン
vercel logout
vercel login
``` 