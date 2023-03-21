import type { NextApiRequest, NextApiResponse } from 'next';

import BookRepository from '@/core/domains/book/BookRepository';
import { Book } from '@/core/models/book';
import { ApiResponse } from '@/types';
import getUserIdFromCookie from '@/utils/cookie';

type Response = Book | ApiResponse;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { bookId } = req.query;
  if (!bookId || Array.isArray(bookId)) {
    return res.status(400).json({
      status: 400,
      message: 'authorId and description and title must be present.',
    });
  }

  const userId = getUserIdFromCookie(req.headers.cookie);

  if (!userId) {
    return res.status(401).json({
      status: 401,
      message: 'auth error',
    });
  }

  const bookRepository = new BookRepository();

  switch (req.method) {
    case 'GET': {
      return bookRepository
        .getBook({ id: bookId })
        .then((book) => {
          if (!book) {
            return res.status(404).json({
              status: 404,
              message: 'Not founded.',
            });
          }
          return res.status(200).json(book);
        })
        .catch(() => {
          res.status(500).json({
            status: 500,
            message: 'An unexpected error has occurred.',
          });
        });
    }

    case 'DELETE': {
      return bookRepository
        .deleteBook({ id: bookId })
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
    }

    default:
      return res.status(405).end();
  }
}
