import { PostRegister } from '@/core/models/register/postRegister';
import { User } from '@/core/models/user';
import { User as PrismaUser } from '@/utils/prisma';

export interface IUserService {
  postUser: ({ name, email, passwordHash }: Omit<PrismaUser, 'id'>) => Promise<User>;

  getUserForId: ({ id }: Pick<PrismaUser, 'id'>) => Promise<User | null>;

  getUserForEmail: ({ email }: Pick<PrismaUser, 'email'>) => Promise<User | null>;
}

export default class UserService implements IUserService {
  async addRegister({ name, email }: PostRegister) {
    return fetch('/api/register', { method: 'POST', body: JSON.stringify({ name, email }) })
      .then(async (response) => {
        if (!response.ok) {
          console.error('response.ok:', response.ok);
          console.error('response.status:', response.status);
          console.error('response.statusText:', response.statusText);
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        console.error('エラーが発生しました', error);
      });
  }

  async getRegister({ token }: { token: string }): Promise<Register | null> {
    return fetch(`/api/register${new URLSearchParams(token)}`, { method: 'GET' })
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
        console.error('エラーが発生しました', error);
      });
  }

  async deleteRegister({ token }: { token: string }): Promise<void> {
    return fetch(`/api/register${new URLSearchParams(token)}`, { method: 'DELETE' })
      .then(async (response) => {
        if (!response.ok) {
          console.error('response.ok:', response.ok);
          console.error('response.status:', response.status);
          console.error('response.statusText:', response.statusText);
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        console.error('エラーが発生しました', error);
      });
  }
}
