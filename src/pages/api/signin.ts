import type { NextApiRequest, NextApiResponse } from 'next';
import UserRepository from '@/core/domains/user/UserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import cookie from 'cookie';

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
  const userRepository = new UserRepository();

  switch (req.method) {
    case 'GET':
      const body = req.body;

      if (!body.email || !body.password) {
        return res.status(400).json({ error: { message: 'email and password must be present.' } });
      }

      userRepository
        .getUserForEmail({ email: body.email as string })
        .then((responseUser) => {
          if (!responseUser) {
            return res
              .status(400)
              .json({ error: { message: 'There is no user with this email address.' } });
          }

          bcrypt
            .compare(body.password, responseUser.passwordHash)
            .then((responseBcrypt) => {
              if (!responseBcrypt) {
                return res
                  .status(403)
                  .json({ error: { message: 'There is no user with this email address.' } });
              }

              const sessionExpiresIn = 7 * 24 * 60 * 60; // 7 days
              const now = Math.floor(Date.now() / 1000);

              const sessionInfo = {
                iat: now,
                exp: now + sessionExpiresIn,
                sub: responseUser.id,
              } as const;

              const JWT_SECRET = readFileSync('jwtRS256.key');

              if (!JWT_SECRET) {
                return res.status(500).json({ error: { message: 'JWT_SECRET is not set.' } });
              }

              const token = jwt.sign(sessionInfo, JWT_SECRET);

              return res.status(204).setHeader(
                'Set-Cookie',
                cookie.serialize('book_shelf_session', token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'development' ? false : true,
                  path: `/`,
                }),
              );
            })
            .catch(() => {
              return res
                .status(500)
                .json({ error: { message: 'An unexpected error has occurred.' } });
            });
        })
        .catch(() => {
          return res.status(500).json({ error: { message: 'Database communication failed' } });
        });

      break;

    default:
      res.status(405).end();
      break;
  }
}
