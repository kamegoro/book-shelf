import type { NextApiRequest, NextApiResponse } from 'next';
import RegisterRepository from '@/core/domains/register/RegisterRepository';
import sendMail from '@/utils/sendgrid';
import crypto from 'crypto';
import { PostRegister } from '@/core/models/register/postRegister';
import { Register } from '@/core/models/register';

type Data = {
  data: Register | null;
};

type Error = {
  error: {
    message: string;
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  const registerRepository = new RegisterRepository();
  const { token } = req.query;

  switch (req.method) {
    case 'GET':
      if (Array.isArray(token) || !token) {
        res.status(400).json({ error: { message: 'The format of the token is incorrect.' } });
        return;
      }

      registerRepository
        .getRegister({ token })
        .then((register) => {
          res.status(200).json({ data: register });
        })
        .catch(() => {
          res.status(500).json({ error: { message: 'failed' } });
        });
      break;

    case 'POST':
      const body = req.body;
      if (!body.email || !body.name) {
        res.status(400).json({ error: { message: 'email and password must be present.' } });
        return;
      }

      // TODO: 型バリデーション
      const requestBody = {
        name: body.name as string,
        email: body.email as string,
      } as const;

      const fromMail = process.env.FROM_MAIL;
      if (!fromMail) {
        res.status(500).json({ error: { message: 'from mail must be present' } });
        return;
      }

      const url =
        process.env.NODE_ENV === 'production'
          ? 'https://maki-forest-book-shelf.onrender.com/'
          : 'http://localhost:3000/';
      const newToken = crypto.randomUUID();

      registerRepository
        .postRegister({ ...requestBody, token: newToken })
        .then(() => {
          sendMail({
            to: requestBody.email,
            from: fromMail,
            subject: '【Book Shelf】アカウント登録のお知らせ',
            text: `
Book Shelfからのお知らせです。
アカウント登録のリクエストを受け付けました。
下記のリンクからパスワードの設定をお願い致します。
【Book Shelf登録ページ】
${url}/register?token=${newToken}
                      `,
          })
            .then((response) => {
              res.status(response[0].statusCode);
            })
            .catch(() => {
              res.status(500).json({ error: { message: 'メールの送信に失敗しました' } });
            });
          res.status(200);
        })
        .catch(() => {
          res.status(500).json({ error: { message: '予期せぬエラーが発生しました。' } });
        });

      break;

    case 'DELETE':
      // 配列形式 or undefinedの場合は不正とみなす
      if (typeof token !== 'string' || !token) {
        res.status(400).json({ error: { message: 'The format of the token is incorrect.' } });
        return;
      }

      token;

      registerRepository
        .deleteRegister({ token })
        .then(() => {
          res.status(200);
        })
        .catch(() => {
          res.status(500).json({ error: { message: '予期せぬエラーが発生しました。' } });
        });

      break;

    default:
      res.status(405).end();
      break;
  }
}
