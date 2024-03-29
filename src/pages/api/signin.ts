import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import UserRepository from '@/core/domains/user/UserRepository';
import { ApiResponse } from '@/types';

type RequestBody = {
  email: string;
  password: string;
};

type Response = ApiResponse;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const userRepository = new UserRepository();

  switch (req.method) {
    case 'POST': {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const body = JSON.parse(req.body) as RequestBody;

      if (!body.email || !body.password) {
        return res.status(400).json({
          status: 400,
          message: 'email and password must be present.',
        });
      }

      return userRepository
        .getUserForEmail({ email: body.email })
        .then((responseUser) => {
          if (!responseUser) {
            return res.status(400).json({
              status: 400,
              message: 'There is no user with this email address.',
            });
          }

          return bcrypt
            .compare(body.password, responseUser.passwordHash)
            .then((responseBcrypt) => {
              if (!responseBcrypt) {
                return res.status(403).json({
                  status: 403,
                  message: 'There is no user with this email address.',
                });
              }

              const sessionExpiresIn = 7 * 24 * 60 * 60; // 7 days
              const now = Math.floor(Date.now() / 1000);

              const sessionInfo = {
                iat: now,
                exp: now + sessionExpiresIn,
                sub: responseUser.id,
              } as const;

              const { JWT_SECRET } = process.env;

              if (!JWT_SECRET) {
                return res.status(500).json({
                  status: 500,
                  message: 'JWT_SECRET is not set.',
                });
              }

              const token = jwt.sign(sessionInfo, JWT_SECRET);

              res.setHeader(
                'Set-Cookie',
                cookie.serialize('book_shelf_session', token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV !== 'development',
                  path: `/`,
                }),
              );

              return res.status(204).end(res.getHeader('book_shelf_session'));
            })
            .catch(() =>
              res.status(500).json({
                status: 500,
                message: 'An unexpected error has occurred.',
              }),
            );
        })
        .catch(() =>
          res.status(500).json({
            status: 500,
            message: 'Database communication failed',
          }),
        );
    }

    default:
      return res.status(405).end();
  }
}
