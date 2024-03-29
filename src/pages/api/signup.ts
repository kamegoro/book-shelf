import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt';

import UserRepository from '@/core/domains/user/UserRepository';
import { User } from '@/core/models/user';
import { ApiResponse } from '@/types';

type RequestBody = {
  email: string;
  name: string;
  password: string;
};

type Response = User | ApiResponse;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  switch (req.method) {
    case 'POST': {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const body = JSON.parse(req.body) as RequestBody;

      if (!body.email || !body.name || !body.password) {
        return res.status(400).json({
          status: 400,
          message: 'email and name and password must be present.',
        });
      }

      // TODO: 型バリデーションをしたい
      const requestBody = {
        email: body.email,
        name: body.name,
        passwordHash: await bcrypt.hash(body.password, 10),
      } as const;

      const userRepository = new UserRepository();
      return userRepository
        .postUser(requestBody)
        .then(() =>
          res.status(201).json({
            status: 201,
            message: 'Success',
          }),
        )
        .catch(() =>
          res.status(500).json({
            status: 500,
            message: 'failed',
          }),
        );
    }

    case 'GET': {
      return res.status(200).json({
        status: 200,
        message: 'success',
      });
    }

    default:
      return res.status(405).end();
  }
}
