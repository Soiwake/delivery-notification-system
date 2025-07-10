# 🆕 新しいプロジェクトのデプロイ手順

## 📋 事前準備

### 必要なもの
- GitHubアカウント
- Vercelアカウント（GitHubでログイン可能）
- Node.js（ローカル開発用）

## 🚀 手順詳細

### 1. プロジェクト作成

#### Next.jsプロジェクトの場合
```bash
# 新しいNext.jsプロジェクト作成
npx create-next-app@latest my-new-project
cd my-new-project

# 開発サーバー起動（動作確認）
npm run dev
```

#### 既存のReactプロジェクトの場合
```bash
# 既存プロジェクトに移動
cd existing-react-project

# 依存関係インストール
npm install
```

### 2. GitHubリポジトリ作成

#### GitHub.comでリポジトリ作成
1. https://github.com にアクセス
2. 「New repository」をクリック
3. リポジトリ名を入力（例：`my-new-project`）
4. 「Create repository」をクリック

#### ローカルでGit設定
```bash
# Git初期化
git init

# ファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit"

# mainブランチに設定
git branch -M main

# GitHubリポジトリをリモートとして追加
git remote add origin https://github.com/yourusername/my-new-project.git

# GitHubにプッシュ
git push -u origin main
```

### 3. Vercelでデプロイ

#### 方法A: Vercel CLI使用（推奨）
```bash
# Vercel CLIインストール（初回のみ）
npm install -g vercel

# プロジェクトをVercelに接続
vercel

# 質問に答える：
# - Set up and deploy? → Y
# - Which scope? → 自分のアカウントを選択
# - Link to existing project? → N（新規プロジェクト）
# - Project name? → プロジェクト名（デフォルトでOK）
# - Directory? → ./（デフォルトでOK）
# - Override settings? → N（デフォルトでOK）

# 本番デプロイ
vercel --prod
```

#### 方法B: Vercel Webサイト使用
1. https://vercel.com にアクセス
2. GitHubでログイン
3. 「New Project」をクリック
4. 作成したGitHubリポジトリを選択
5. 設定を確認して「Deploy」をクリック

### 4. 自動デプロイの確認

#### テスト用の変更をプッシュ
```bash
# 何か変更を加える（例：README.mdを編集）
echo "# My New Project" > README.md

# 変更をコミット・プッシュ
git add .
git commit -m "Add README"
git push origin main
```

#### 自動デプロイの確認
- Vercelダッシュボードでデプロイ状況を確認
- 数分後に本番サイトが更新される

## 📊 デプロイ後の確認事項

### ✅ 確認すべき項目
1. **本番サイトが正常に表示されるか**
2. **すべての機能が動作するか**
3. **画像やスタイルが正しく読み込まれるか**
4. **レスポンシブデザインが正常か**

### 🔧 よくある問題と解決方法

#### ビルドエラーが発生する場合
```bash
# ローカルでビルドテスト
npm run build

# エラーがあれば修正してから再プッシュ
git add .
git commit -m "Fix build errors"
git push origin main
```

#### 環境変数が必要な場合
1. Vercelダッシュボードにアクセス
2. プロジェクト設定 → Environment Variables
3. 必要な環境変数を追加
4. 再デプロイ

## 🎯 完成後の運用

### 日常的な開発フロー
```bash
# 1. ローカル開発
npm run dev

# 2. 変更をデプロイ
git add .
git commit -m "機能追加"
git push origin main

# 3. 自動でデプロイ完了！
```

### 重要なURL
- **本番サイト**: https://your-project-name.vercel.app
- **Vercelダッシュボード**: https://vercel.com/your-username/your-project-name
- **GitHubリポジトリ**: https://github.com/yourusername/your-project-name

## 💡 プロジェクト別の注意点

### Next.jsプロジェクト
- `next.config.js` の設定確認
- 静的ファイルの配置確認

### Reactプロジェクト（Create React App）
- `package.json` の `homepage` 設定
- ルーティング設定の確認

### TypeScriptプロジェクト
- `tsconfig.json` の設定確認
- 型エラーの解決

## 🆘 トラブルシューティング

### Vercel CLIでエラーが出る場合
```bash
# Vercel CLI再インストール
npm uninstall -g vercel
npm install -g vercel

# 再ログイン
vercel logout
vercel login
```

### GitHub連携でエラーが出る場合
```bash
# リモートリポジトリ確認
git remote -v

# 必要に応じて再設定
git remote remove origin
git remote add origin https://github.com/username/repo-name.git
``` 