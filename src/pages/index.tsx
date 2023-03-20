import { useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { useSnackbar } from '@/components/contexts/SnackbarContext';
import BookCard from '@/components/molecules/BookCard';
import Box from '@/components/mui/Box';
import Button from '@/components/mui/Button';
import Typography from '@/components/mui/Typography';
import BookService from '@/core/domains/book/BookService';
import { Book } from '@/core/models/book';
import withAuth from '@/utils/withAuth';

type PageProps = {
  books: Book[];
  error?: boolean;
};

const DashBoard = ({ books, error }: PageProps) => {
  const router = useRouter();

  const { showError } = useSnackbar();

  useEffect(() => {
    if (error) showError('データの取得に失敗しました。');
  }, []);

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
        DashBoard
      </Typography>
      <Box sx={{ backgroundColor: 'brand.white', p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography
            component="span"
            sx={{
              color: 'gray.text',
            }}
          >
            直近の本リスト ({books.length})
          </Typography>
          <Button
            variant="outlined"
            onClick={async () => {
              await router.push(`/books`);
            }}
          >
            本棚へ
          </Button>
        </Box>
        <Box sx={{ backgroundColor: 'brand.white', p: 4, borderRadius: 3 }}>
          {!books.length ? (
            <Box>登録している本はありません</Box>
          ) : (
            <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {books.map((book, i) => (
                <Box key={`${i + 1}`}>
                  <BookCard
                    src={book.image || 'https://loremflickr.com/640/480/abstract'}
                    title={book.title}
                    description={book.description}
                    onClickImage={async () => {
                      await router.push(`/books/${book.id}`);
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DashBoard;

export const getServerSideProps: GetServerSideProps = withAuth(async (ctx) => {
  const { cookie } = ctx.req.headers;

  if (!cookie) {
    ctx.res.setHeader('Location', '/signin');
    ctx.res.statusCode = 307;
  }

  const bookService = new BookService();

  return bookService
    .getGetBooksForDashBoard({ cookie } as { cookie: string })
    .then((books) => ({
      props: {
        books,
      } as PageProps,
    }))
    .catch(() => ({
      props: {
        books: [],
        error: true,
      } as PageProps,
    }));
});
