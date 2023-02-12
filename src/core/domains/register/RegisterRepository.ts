import prisma, { Register } from '@/utils/prisma';

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

  deleteRegister: ({ token }: { token: string }) => Promise<void>;

  getRegister: ({ token }: { token: string }) => Promise<Register | null>;
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

  async deleteRegister({ token }: { token: string }): Promise<void> {
    return prisma.register
      .findFirst({
        where: { token },
      })
      .then((result) => {
        if (result) {
          prisma.register.delete({ where: { id: result.id } });
        }
      })
      .catch((error) => {
        // TODO: ErrorHandlingを細かく対応したい
        throw error;
      });
  }

  async getRegister({ token }: { token: string }): Promise<Register | null> {
    return prisma.register
      .findFirst({
        where: { token },
      })
      .catch((error) => {
        // TODO: ErrorHandlingを細かく対応したい
        throw error;
      });
  }
}
