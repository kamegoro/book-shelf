import { useEffect } from 'react';

import { GetServerSideProps } from 'next';

import { useSnackbar } from '@/components/contexts/SnackbarContext';
import BookCard from '@/components/molecules/BookCard';
import Box from '@/components/mui/Box';
import Typography from '@/components/mui/Typography';
import BookService from '@/core/domains/book/BookService';
import { Book } from '@/core/models/book';
import withAuth from '@/utils/withAuth';

type PageProps = {
  book: Book | null;
};

const BookPage = ({ book }: PageProps) => {
  const { showError } = useSnackbar();

  useEffect(() => {
    if (!book) showError('データの取得に失敗しました。');
  }, [book]);

  return (
    <Box sx={{ width: 960, py: 6 }}>
      <Typography
        component="h2"
        sx={{
          color: 'gray.text',
          fontWeight: 'bold',
          fontSize: 26,
          mb: 4,
        }}
      >
        タイトル: 本の名前
      </Typography>
      <Box sx={{ backgroundColor: 'brand.white', p: 4, borderRadius: 3 }}>
        {book && (
          <BookCard
            src={book.image || 'https://loremflickr.com/640/480/abstract'}
            title={book.title}
            description={book.description}
          />
        )}
      </Box>
    </Box>
  );
};

export default BookPage;

export const getServerSideProps: GetServerSideProps = withAuth(async (ctx) => {
  const bookId = ctx.query['book-id'];
  const { cookie } = ctx.req.headers;

  if (!cookie) {
    ctx.res.setHeader('Location', '/signin');
    ctx.res.statusCode = 307;
  }

  const bookService = new BookService();

  return bookService
    .getBook({ id: bookId, cookie } as { id: string; cookie: string })
    .then((book) => {
      if (!book) {
        ctx.res.setHeader('Location', '/404');
        ctx.res.statusCode = 404;
      }
      return {
        props: {
          book,
        } as PageProps,
      };
    })
    .catch(() => ({
      props: {
        book: null,
      } as PageProps,
    }));
});
