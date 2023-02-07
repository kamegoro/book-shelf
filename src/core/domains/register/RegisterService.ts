import prisma from '@/utils/prisma';

export interface IRegisterRepository {
  addRegister: ({ name, email, token }: { name: string; email: string; token: string }) => void;
}

export class RegisterRepository {
  static async addRegister({ name, email, token }: { name: string; email: string; token: string }) {
    return await prisma.register.create({ data: { name, email, token } });
  }
}
