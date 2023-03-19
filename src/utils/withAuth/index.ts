import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import cookies from 'cookie';

type InnerGetServerSideProps<P extends { [key: string]: unknown }> = (
  context: GetServerSidePropsContext,
) => Promise<{ props: P }>;

const withAuth =
  <P extends { [key: string]: unknown }>(inner?: InnerGetServerSideProps<P>): GetServerSideProps =>
  async (ctx) => {
    const {
      req: { headers },
      res,
    } = ctx;
    const requestCookie = headers.cookie;
    if (!(requestCookie && cookies.parse(requestCookie))) {
      res.setHeader('Location', '/signin');
      res.statusCode = 307;
    }

    return inner ? inner(ctx) : { props: {} };
  };

export default withAuth;
