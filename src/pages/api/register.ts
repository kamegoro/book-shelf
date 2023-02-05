import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  token: string;
  name: string;
  email: string;
  createdAt: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      // パラメータに付与されているTokenの有無を確認
      break;

    case 'POST':
      // Request Bodyにデータが含まれているかのバリデーション
      break;

    case 'DELETE':
    // Tokenの有効期限が切れている or ユーザー登録が完了したらテーブルデータを削除する

    default:
      res.status(405).end();
      break;
  }
}
