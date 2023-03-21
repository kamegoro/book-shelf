import type { NextApiRequest, NextApiResponse } from 'next';

import crypto from 'crypto';

import RegisterRepository from '@/core/domains/register/RegisterRepository';
import { Register } from '@/core/models/register';
import sendMail from '@/utils/sendgrid';

type RequestBody = {
  email: string;
  name: string;
};

type Response =
  | Register
  | null
  | {
      status: number;
      message: string;
    }
  | void;

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const registerRepository = new RegisterRepository();
  const { token } = req.query;

  switch (req.method) {
    case 'GET': {
      if (Array.isArray(token) || !token) {
        return res.status(400).json({
          status: 400,
          message: 'The format of the token is incorrect.',
        });
      }

      return registerRepository
        .getRegister({ token } as { token: string })
        .then((register) => {
          res.status(200).json(register);
        })
        .catch(() => {
          res.status(500).json({
            status: 500,
            message: 'failed',
          });
        });
    }

    case 'POST': {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
      const body = JSON.parse(req.body) as RequestBody;

      // 型エラーは無いがInterfaceで強制的に型を付与しているだけなので、バリデーションは必須
      if (!body.name || !body.name) {
        return res.status(400).json({
          status: 400,
          message: 'email and password must be present.',
        });
      }

      // TODO: 型バリデーション
      const requestBody = {
        name: body.name,
        email: body.email,
      } as const;

      const fromMail = process.env.FROM_MAIL;

      if (!fromMail) {
        return res.status(500).json({
          status: 500,
          message: 'from mail must be present',
        });
      }

      const url =
        process.env.NODE_ENV === 'production'
          ? 'https://maki-forest-book-shelf.onrender.com/'
          : 'http://localhost:3000/';
      const newToken = crypto.randomUUID();

      return registerRepository
        .postRegister({ ...requestBody, token: newToken })
        .then(async () => {
          await sendMail({
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
          }).then((v) => res.status(v[0].statusCode).json());
        })
        .catch(() => {
          res.status(500).json({
            status: 500,
            message: 'An unexpected error has occurred.',
          });
        });

      break;
    }

    case 'DELETE': {
      // 配列形式 or undefinedの場合は不正とみなす
      if (typeof token !== 'string' || !token) {
        return res.status(400).json({
          status: 400,
          message: 'The format of the token is incorrect.',
        });
      }

      return registerRepository
        .deleteRegister({ token })
        .then(() => {
          res.status(200).json();
        })
        .catch(() => {
          res.status(500).json({
            status: 500,
            message: 'An unexpected error has occurred.',
          });
        });
    }

    default:
      return res.status(405).end();
  }
}
