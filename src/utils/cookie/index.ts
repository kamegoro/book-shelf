import cookies from 'cookie';
import jwt from 'jsonwebtoken';

function verifyJWT<Payload = unknown>(token: string, secret: string): Payload | null {
  try {
    return jwt.verify(token, secret) as Payload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (e.name === 'TokenExpiredError' || e.name === 'JsonWebTokenError') {
      return null;
    }
    throw e;
  }
}

const getUserIdFromCookie = (cookie: string | undefined): string | null => {
  if (!cookie) return null;

  const parseCookie = cookies.parse(cookie);

  if (parseCookie.book_shelf_session) {
    const sessionInfo = verifyJWT<{ sub: string }>(
      parseCookie.book_shelf_session,
      process.env.JWT_SECRET ?? '',
    );

    return sessionInfo?.sub || null;
  }

  return null;
};

export default getUserIdFromCookie;
