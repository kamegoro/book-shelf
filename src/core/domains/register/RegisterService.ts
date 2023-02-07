export interface IRegisterService {
  addRegister: ({ name, email }: { name: string; email: string }) => Promise<void>;
}

export default class RegisterService implements IRegisterService {
  async addRegister({ name, email }: { name: string; email: string }) {
    return fetch('/api/register', { method: 'POST', body: JSON.stringify({ name, email }) })
      .then(async (response) => {
        if (!response.ok) {
          console.error('response.ok:', response.ok);
          console.error('esponse.status:', response.status);
          console.error('esponse.statusText:', response.statusText);
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        console.error('エラーが発生しました', error);
      });
  }
}
