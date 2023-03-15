import type { NextApiRequest, NextApiResponse } from 'next';

import BookRepository from '@/core/domains/book/BookRepository';
import { CreateBook } from '@/core/models/book';
import { ApiResponse } from '@/types';

interface ExtendNextApiRequest extends NextApiRequest {
  body: CreateBook;
}

type Response = { id: string } | null | ApiResponse | void;

export default async function handler(req: ExtendNextApiRequest, res: NextApiResponse<Response>) {
  switch (req.method) {
    case 'POST': {
      const { body } = req;
      if (!body.authorId || !body.description || !body.title) {
        res.status(400).json({
          status: 400,
          message: 'authorId and description and title must be present.',
        });
      }

      const bookRepository = new BookRepository();

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

    default:
      res.status(405).end();
      break;
  }
}
