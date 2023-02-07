import prisma from '@/utils/prisma';
import { Register } from '@/utils/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export interface IRegisterRepository {
  postRegister: ({
    name,
    email,
    token,
  }: {
    name: string;
    email: string;
    token: string;
  }) => Promise<Register>;
}

export default class RegisterRepository implements IRegisterRepository {
  async postRegister({
    name,
    email,
    token,
  }: {
    name: string;
    email: string;
    token: string;
  }): Promise<Register> {
    return prisma.register
      .create({ data: { name, email, token } })
      .then((register) => register)
      .catch((error) => {
        // TODO: ErrorHandlingを細かく対応したい
        throw error;
      });
  }
}
