import prisma from '@/utils/prisma';
import { User } from '@/core/models/user';
import { User as PrismaUser } from '@/utils/prisma';

export interface IUserRepository {
  postUser: ({ name, email, passwordHash }: Omit<PrismaUser, 'id' | 'avatar'>) => Promise<User>;

  getUserForId: ({ id }: Pick<PrismaUser, 'id'>) => Promise<User | null>;

  getUserForEmail: ({ email }: Pick<PrismaUser, 'email'>) => Promise<User | null>;
}

export default class UserRepository implements IUserRepository {
  async postUser({ name, email, passwordHash }: Omit<PrismaUser, 'id' | 'avatar'>): Promise<User> {
    return prisma.user
      .create({
        data: { name, email, passwordHash },
        select: { id: true, email: true, name: true, avatar: true },
      })
      .then((user) => user)
      .catch((error) => {
        throw error;
      });
  }

  async getUserForId({ id }: Pick<PrismaUser, 'id'>): Promise<User | null> {
    return prisma.user
      .findUnique({
        where: { id },
        select: { id: true, email: true, name: true, avatar: true },
      })
      .then((user) => user)
      .catch((error) => {
        throw error;
      });
  }

  async getUserForEmail({ email }: Pick<PrismaUser, 'email'>): Promise<User | null> {
    return prisma.user
      .findUnique({
        where: { email },
        select: { id: true, email: true, name: true, avatar: true },
      })
      .then((user) => user)
      .catch((error) => {
        throw error;
      });
  }
}
