/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */

import { Register } from '@/core/models/register';
import { PostRegister } from '@/core/models/register/postRegister';

export interface IRegisterService {
  addRegister: ({ name, email }: PostRegister) => Promise<void>;
  getRegister: ({ token }: { token: string }) => Promise<Register | null>;
  deleteRegister: ({ token }: { token: string }) => Promise<void>;
}

const host = process.env.HOST_NAME as string;

export default class RegisterService implements IRegisterService {
  async addRegister({ name, email }: PostRegister) {
    return fetch(`${host}/api/register`, { method: 'POST', body: JSON.stringify({ name, email }) })
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

  async getRegister({ token }: { token: string }): Promise<Register | null> {
    return fetch(`${host}/api/register?${new URLSearchParams({ token }).toString()}`, {
      method: 'GET',
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

  async deleteRegister({ token }: { token: string }): Promise<void> {
    return fetch(`${host}/api/register${new URLSearchParams({ token }).toString()}`, {
      method: 'DELETE',
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
