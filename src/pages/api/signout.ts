import type { NextApiRequest, NextApiResponse } from 'next';

import cookies from 'cookie';

import { ApiResponse } from '@/types';
import getUserIdFromCookie from '@/utils/cookie';

type Response = ApiResponse;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const userId = getUserIdFromCookie(req.headers.cookie);

  if (!userId) {
    res.status(401).json({
      status: 401,
      message: 'auth error',
    });
  }

  switch (req.method) {
    case 'POST': {
      res.setHeader('Set-Cookie', [
        cookies.serialize('book_shelf_session', '', {
          maxAge: -1,
          path: '/',
        }),
      ]);

      return res.status(204).end(res.getHeader('book_shelf_session'));
    }

    default:
      return res.status(405).end();
  }
}
