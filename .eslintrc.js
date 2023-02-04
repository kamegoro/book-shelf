module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: [
    'next',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-hook-form'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: '.',
  },
  rules: {
    // NOTE: 表示名がなくても関数名で判断できるため無効にする
    'react/display-name': 'off',

    // NOTE: Reactのpropsでスプレッド演算子を許可する
    'react/jsx-props-no-spreading': 'off',

    // NOTE: importにReactを含めないのを許可する
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    // NOTE: Reactのprops, state等を分割代入でなくても許可する
    'react/destructuring-assignment': 'off',

    // NOTE: Reactのコンポーネント定義を関数式、アロー関数を許可する
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['function-declaration', 'arrow-function'],
      },
    ],

    // NOTE: 戻り値のないPromiseの場合にvoidを付けるのを強制されるため無効にする
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
  },
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      rules: {
        // NOTE: TypeScriptでは不要なので無効にする
        'react/prop-types': 'off',
      },
    },
  ],
};
