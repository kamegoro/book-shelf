import type { NextApiRequest, NextApiResponse } from 'next';

import BookRepository from '@/core/domains/book/BookRepository';
import { Book } from '@/core/models/book';
import { ApiResponse } from '@/types';

type Response = Book[] | null | ApiResponse | void;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { userId } = req.query;
  if (!userId || Array.isArray(userId)) {
    res.status(400).json({
      status: 400,
      message: 'authorId and description and title must be present.',
    });
  }

  const bookRepository = new BookRepository();

  switch (req.method) {
    case 'GET': {
      bookRepository
        .getBooks({ authorId: userId as string })
        .then((book) => {
          res.status(200).json(book);
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
