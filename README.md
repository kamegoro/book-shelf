## Book Shelf

個別に本を登録できるアプリケーション

### 技術スタック

（2023/02/01 現在）

- Next.js
- TypeScript
- Node.js
- Mui（Mui-icon）

### 開発セットアップ

パッケージマネージャは[pnpm](https://pnpm.io/ja/installation)を採用
下記のコマンドで`node_modules`をインストール

```bash
pnpm i
```

[localhost:3000](http://localhost:3000)を立ち上げる

```bash
pnpm dev
```

### ブランチの切り方

- 基本的には`main`ブランチから切るが、規模が大きくなる場合や作業が重複する場合のみ子ブランチから切っても良い。
- ブランチ名は`feature/×××`または`feat/×××`に統一

### PR の運用

- `main`ブランチにマージする時のみ自分を除く１名の`Approved`が必須
  Free プランなので各自でマージ出来てしまいますが、極力避けてください）
- `main`ブランチへの直 Push は禁止
- `Approved`後は PR 作成者がマージしてください
