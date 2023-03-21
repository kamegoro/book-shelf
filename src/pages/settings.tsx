import { useEffect } from 'react';

import { GetServerSideProps } from 'next';

import { useSnackbar } from '@/components/contexts/SnackbarContext';
import Box from '@/components/mui/Box';
import Typography from '@/components/mui/Typography';
import UserService from '@/core/domains/user/UserService';
import { User } from '@/core/models/user';
import getUserIdFromCookie from '@/utils/cookie';
import withAuth from '@/utils/withAuth';

type PageProps = {
  user: User | null;
};

const Settings = ({ user }: PageProps) => {
  const { showError } = useSnackbar();
  useEffect(() => {
    if (!user) showError('データが存在しません。');
  }, [user]);

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
        設定
      </Typography>
    </Box>
  );
};

export default Settings;

export const getServerSideProps: GetServerSideProps = withAuth(async (ctx) => {
  const { cookie } = ctx.req.headers;

  if (!cookie) {
    ctx.res.setHeader('Location', '/signin');
    ctx.res.statusCode = 307;
  }

  const userId = getUserIdFromCookie(cookie);

  if (!userId) {
    ctx.res.setHeader('Location', '/signin');
    ctx.res.statusCode = 404;
  }

  const userService = new UserService();

  return userService
    .getUser({ cookie } as { cookie: string })
    .then((user) => {
      if (!user) {
        ctx.res.setHeader('Location', '/404');
        ctx.res.statusCode = 404;
      }

      return {
        props: {
          user,
        } as PageProps,
      };
    })
    .catch(() => ({
      props: {
        user: null,
      } as PageProps,
    }));
});
