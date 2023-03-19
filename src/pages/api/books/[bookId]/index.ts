import type { NextApiRequest, NextApiResponse } from 'next';

import BookRepository from '@/core/domains/book/BookRepository';
import { Book } from '@/core/models/book';
import { ApiResponse } from '@/types';
import getUserIdFromCookie from '@/utils/cookie';

type Response = Book | null | ApiResponse | void;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { bookId } = req.query;
  if (!bookId || Array.isArray(bookId)) {
    res.status(400).json({
      status: 400,
      message: 'authorId and description and title must be present.',
    });
  }

  const userId = getUserIdFromCookie(req.headers.cookie);

  if (!userId) {
    res.status(401).json({
      status: 401,
      message: 'auth error',
    });
  }

  const bookRepository = new BookRepository();

  switch (req.method) {
    case 'GET': {
      bookRepository
        .getBook({ id: bookId as string })
        .then((book) => {
          if (!book) {
            res.status(404).json({
              status: 404,
              message: 'Not founded.',
            });
          } else {
            res.status(200).json(book);
          }
        })
        .catch(() => {
          res.status(500).json({
            status: 500,
            message: 'An unexpected error has occurred.',
          });
        });

      break;
    }

    case 'DELETE': {
      bookRepository
        .deleteBook({ id: bookId as string })
        .then(() => {
          res.status(201).json({
            status: 201,
            message: 'Book successfully deleted.',
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

    default:
      res.status(405).end();
      break;
  }
}
