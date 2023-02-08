## Book Shelf

個別に本を登録できるアプリケーション

## 使用技術

[![Javascript](https://img.shields.io/badge/javascript-language-dimgray?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node](https://img.shields.io/badge/node.js-language-dimgray?style=for-the-badge&logo=node.js)](https://nodejs.org/ja/)
[![Typescript](https://img.shields.io/badge/typescript-javascript_type_definitions-dimgray?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/react-ui_javascript_liblary-dimgray?style=for-the-badge&logo=react)](https://ja.reactjs.org/)
[![Next.js](https://img.shields.io/badge/next.js-react_framework-dimgray?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MUI](https://img.shields.io/badge/mui-ui_component_library-dimgray?style=for-the-badge&logo=mui)](https://mui.com/)
[![Webpack](https://img.shields.io/badge/webpack-javascript_bundler-dimgray.svg?style=for-the-badge&logo=webpack)](https://webpack.js.org/)
[![Prisma](https://img.shields.io/badge/prisma-ORM-dimgray.svg?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Github Actions](https://img.shields.io/badge/github_actions-ci/cd-dimgray?style=for-the-badge&logo=github)](https://github.com/features/actions)

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
