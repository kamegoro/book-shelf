import type { NextApiRequest, NextApiResponse } from 'next';

import UserRepository from '@/core/domains/user/UserRepository';
import { User } from '@/core/models/user';
import { ApiResponse } from '@/types';
import getUserIdFromCookie from '@/utils/cookie';

type Response = User | ApiResponse;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const userId = getUserIdFromCookie(req.headers.cookie);

  if (!userId) {
    return res.status(401).json({
      status: 401,
      message: 'auth error',
    });
  }

  const userRepository = new UserRepository();

  switch (req.method) {
    case 'GET': {
      return userRepository
        .getUserForId({ id: userId })
        .then((user) => {
          if (!user) {
            return res.status(404).json({
              status: 404,
              message: 'Not founded.',
            });
          }
          return res.status(200).json(user);
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
