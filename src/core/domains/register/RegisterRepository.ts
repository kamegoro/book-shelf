import prisma from '@/utils/prisma';

export interface IRegisterRepository {
  postRegister: ({
    name,
    email,
    token,
  }: {
    name: string;
    email: string;
    token: string;
  });
}

export class RegisterRepository {
  static async postRegister({
    name,
    email,
    token,
  }: {
    name: string;
    email: string;
    token: string;
  }) {
    return prisma.register
      .create({ data: { name, email, token } })
      .then((register) => register)
      .catch((err) => {
        throw err;
      });
  }
}
