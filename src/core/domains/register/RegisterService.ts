import prisma from '@/utils/prisma';

export interface IRegisterRepository {
  addRegister: ({ name, email }: { name: string; email: string }) => void;
}

export class RegisterRepository {
  static async addRegister() {
    return await prisma;
  }
}
