import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import UserRepository from '@/core/domains/user/UserRepository';
import { User } from '@/core/models/user';

type Data = {
  data: User | null;
};

type Error = {
  error: {
    message: string;
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  switch (req.method) {
    case 'GET':
      break;

    case 'POST':
      const body = req.body;
      if (!body.email || !body.name || !body.password) {
        res
          .status(400)
          .json({ error: { message: 'email and user and password must be present.' } });
        return;
      }

      break;

    case 'DELETE':
      break;

    default:
      res.status(405).end();
      break;
  }
}
