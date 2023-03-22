/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */

import { CreateBook, DeleteBook, GetBook, Book } from '@/core/models/book';
import { Cookie } from '@/types';

export interface IBookService {
  createBook: ({ title, description, image }: CreateBook) => Promise<Book>;
  getBook: ({ id }: GetBook & Cookie) => Promise<Book | null>;
  getBooks: ({ cookie }: Cookie) => Promise<Book[]>;
  deleteBook: ({ id }: DeleteBook) => Promise<void>;
}

const host = process.env.HOST_NAME as string;

export default class BookService implements IBookService {
  async createBook({ title, description, image }: CreateBook): Promise<Book> {
    return fetch(`/api/books`, {
      method: 'POST',
      body: JSON.stringify({ title, description, image }),
      credentials: 'include',
    })
      .then(async (response) => {
        if (!response.ok) {
          console.error('response.ok:', response.ok);
          console.error('response.status:', response.status);
          console.error('response.statusText:', response.statusText);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  async getBook({ id, cookie }: GetBook & Cookie): Promise<Book | null> {
    return fetch(`${host}/api/books/${id}`, {
      method: 'GET',
      headers: {
        cookie,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          console.error('response.ok:', response.ok);
          console.error('response.status:', response.status);
          console.error('response.statusText:', response.statusText);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  async getBooks({ cookie }: Cookie): Promise<Book[]> {
    return fetch(`${host}/api/books`, {
      method: 'GET',
      headers: {
        cookie,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          console.error('response.ok:', response.ok);
          console.error('response.status:', response.status);
          console.error('response.statusText:', response.statusText);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  async getGetBooksForDashBoard({ cookie }: Cookie): Promise<Book[]> {
    return fetch(`${host}/api/books?limit=4`, {
      method: 'GET',
      headers: {
        cookie,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          console.error('response.ok:', response.ok);
          console.error('response.status:', response.status);
          console.error('response.statusText:', response.statusText);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  async deleteBook({ id }: DeleteBook): Promise<void> {
    return fetch(`${host}/api/books/${id}`, { method: 'DELETE' })
      .then(async (response) => {
        if (!response.ok) {
          console.error('response.ok:', response.ok);
          console.error('response.status:', response.status);
          console.error('response.statusText:', response.statusText);
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        throw error;
      });
  }
}
