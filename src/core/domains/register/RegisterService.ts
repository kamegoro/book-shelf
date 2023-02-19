/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */

import { Register } from '@/core/models/register';
import { PostRegister } from '@/core/models/register/postRegister';

export interface IRegisterService {
  addRegister: ({ name, email }: PostRegister) => Promise<void>;
  getRegister: ({ token }: { token: string }) => Promise<Register | null>;
  deleteRegister: ({ token }: { token: string }) => Promise<void>;
}

export default class RegisterService implements IRegisterService {
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
    return fetch(`/api/register${new URLSearchParams({ token }).toString()}`, { method: 'GET' })
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
    return fetch(`/api/register${new URLSearchParams({ token }).toString()}`, { method: 'DELETE' })
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
