import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt';

import UserRepository from '@/core/domains/user/UserRepository';

import { User } from '@/core/models/user';

interface ExtendNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    name: string;
    password: string;
  };
}

type Response =
  | User
  | null
  | {
      status: number;
      message: string;
    }
  | void;

export default async function handler(req: ExtendNextApiRequest, res: NextApiResponse<Response>) {
  switch (req.method) {
    case 'POST': {
      const { body } = req;
      if (!body.email || !body.name || !body.password) {
        res.status(400).json({
          status: 400,
          message: 'email and user and password must be present.',
        });
      }

      // TODO: 型バリデーションをしたい
      const requestBody = {
        email: body.email,
        name: body.name,
        passwordHash: await bcrypt.hash(body.password, 10),
      } as const;

      const userRepository = new UserRepository();
      userRepository
        .postUser(requestBody)
        .then(() => {
          res.status(201).send();
        })
        .catch(() => {
          res.status(500).json({
            status: 500,
            message: 'failed',
          });
        });

      break;
    }

    default:
      res.status(405).end();
      break;
  }
}