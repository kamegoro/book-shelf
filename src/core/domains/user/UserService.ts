/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */
import { User, PostSignUp, GetUser, SignIn } from '@/core/models/user';

export interface IUserService {
  signUpUser: ({ name, email, password }: PostSignUp) => Promise<void>;
  signIn: ({ email, password }: SignIn) => Promise<void>;
  getUser: ({ id }: GetUser) => Promise<User>;
}

export default class UserService implements IUserService {
  async signUpUser({ name, email, password }: PostSignUp): Promise<void> {
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

  async signIn({ email, password }: SignIn): Promise<void> {
    return fetch(`/api/signin`, { method: 'POST', body: JSON.stringify({ email, password }) })
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

  async getUser({ id }: GetUser): Promise<User> {
    return fetch(`/api/users/${id}}`, { method: 'GET' })
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
}
