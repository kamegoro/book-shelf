import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import UserRepository from '@/core/domains/user/UserRepository';
import RegisterRepository from '@/core/domains/register/RegisterRepository';
import bcrypt from 'bcrypt';

import { User } from '@/core/models/user';

type Data = {
  data: User | null;
};

type Error = {
  error: {
    message: string;
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  switch (req.method) {
    case 'POST':
      const body = req.body;
      if (!body.email || !body.name || !body.password) {
        res
          .status(400)
          .json({ error: { message: 'email and user and password must be present.' } });
        return;
      }

      // TODO: 型バリデーションをしたい
      const requestBody = {
        email: body.email as string,
        name: body.name as string,
        passwordHash: await bcrypt.hash(body.password as string, 10),
      } as const;

      const userRepository = new UserRepository();
      userRepository
        .postUser(requestBody)
        .then(() => {
          res.status(201);
        })
        .catch(() => {
          res.status(500).json({ error: { message: 'failed' } });
        });

      break;

    default:
      res.status(405).end();
      break;
  }
}
