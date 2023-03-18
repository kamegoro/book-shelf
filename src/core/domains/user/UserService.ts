/* eslint-disable no-console */
import { User as PrismaUser } from '@/utils/prisma';

export interface IUserService {
  signUpUser: ({
    name,
    email,
    password,
  }: Omit<PrismaUser, 'id' | 'passwordHash'> & {
    password: string;
  }) => Promise<void>;
}

export default class UserService implements IUserService {
  async signUpUser({
    name,
    email,
    password,
  }: Omit<PrismaUser, 'id' | 'passwordHash' | 'avatar'> & {
    password: string;
  }): Promise<void> {
    return fetch(`/api/signup`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
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
