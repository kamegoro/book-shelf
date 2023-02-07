import type { NextApiRequest, NextApiResponse } from 'next';
import RegisterRepository from '@/core/domains/register/RegisterRepository';

import crypto from 'crypto';

// FIXME: プロジェクト内で使う型は１箇所で纏めたい
type Data = {
  data: {
    token: string;
    name: string;
    email: string;
    createdAt: number;
  };
};

type Error = {
  error: {
    message: string;
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  const registerRepository = new RegisterRepository();

  switch (req.method) {
    case 'GET':
      // NOTE: パラメータに付与されているTokenの有無を確認
      break;

    case 'POST':
      const requestBody = req.body;
      if (!requestBody.email || !requestBody.name) {
        res.status(400).json({ error: { message: 'email and password must be present.' } });
      }

      // TODO: Request Bodyにデータが含まれているかのバリデーション

      requestBody as { email: string; name: string };

      const token = crypto.randomUUID();
      registerRepository
        .postRegister({ ...requestBody, token })
        .then(() => {
          // TODO: メール送信の処理
          res.status(201);
        })
        .catch(() => {
          res.status(500).json({ error: { message: '予期せぬエラーが発生しました。' } });
        });

      break;

    case 'DELETE':
    // TODO: Tokenの有効期限が切れている or ユーザー登録が完了したらテーブルデータを削除する

    default:
      res.status(405).end();
      break;
  }
}
