import type { NextApiRequest, NextApiResponse } from 'next';

import BookRepository from '@/core/domains/book/BookRepository';
import { CreateBook, Book } from '@/core/models/book';
import { ApiResponse } from '@/types';
import getUserIdFromCookie from '@/utils/cookie';

type RequestBody = CreateBook;

type Response = { id: string } | Book[] | null | ApiResponse | void;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const userId = getUserIdFromCookie(req.headers.cookie);

  if (!userId) {
    res.status(401).json({
      status: 401,
      message: 'auth error',
    });
  }

  const bookRepository = new BookRepository();

  switch (req.method) {
    case 'POST': {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const body = JSON.parse(req.body) as RequestBody;

      if (!body.authorId || !body.description || !body.title) {
        res.status(400).json({
          status: 400,
          message: 'authorId and description and title must be present.',
        });
      }

      bookRepository
        .postBook({
          authorId: body.authorId,
          description: body.description,
          title: body.title,
        })
        .then((book) => {
          res.status(200).json({
            id: book.id,
          });
        })
        .catch(() => {
          res.status(500).json({
            status: 500,
            message: 'An unexpected error has occurred.',
          });
        });

      break;
    }

    case 'GET': {
      bookRepository
        .getBooks({ authorId: userId as string })
        .then((books) => {
          res.status(200).json(books);
        })
        .catch(() => {
          res.status(500).json({
            status: 500,
            message: 'An unexpected error has occurred.',
          });
        });

      break;
    }

    default:
      res.status(405).end();
      break;
  }
}
