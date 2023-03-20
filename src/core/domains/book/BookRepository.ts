import prisma, { Prisma, Book } from '@/utils/prisma';

export interface IBookRepository {
  postBook: ({
    authorId,
    title,
    description,
    image,
  }: Prisma.BookCreateManyInput) => Promise<{ id: string }>;

  deleteBook: ({ id }: Pick<Book, 'id'>) => Promise<void>;

  getBook: ({ id }: Pick<Book, 'id'>) => Promise<Book | null>;

  getBooks: ({ authorId, limit }: Pick<Book, 'authorId'> & { limit?: number }) => Promise<Book[]>;
}

export default class BookRepository implements IBookRepository {
  async postBook({
    authorId,
    title,
    description,
    image,
  }: Prisma.BookCreateManyInput): Promise<{ id: string }> {
    return prisma.book
      .create({
        data: {
          authorId,
          title,
          description,
          image,
        },
      })
      .then((book) => ({
        id: book.id,
      }))
      .catch((error) => {
        throw error;
      });
  }

  async deleteBook({ id }: Pick<Book, 'id'>): Promise<void> {
    prisma.book
      .delete({
        where: { id },
      })
      .catch((error) => {
        throw error;
      });
  }

  async getBook({ id }: Pick<Book, 'id'>): Promise<Book | null> {
    return prisma.book
      .findUnique({
        where: { id },
      })
      .then((book) => book)
      .catch((error) => {
        throw error;
      });
  }

  async getBooks({
    authorId,
    limit,
  }: Pick<Book, 'authorId'> & { limit?: number }): Promise<Book[]> {
    return prisma.book
      .findMany({ where: { authorId }, take: limit })
      .then((books) => books)
      .catch((error) => {
        throw error;
      });
  }
}
