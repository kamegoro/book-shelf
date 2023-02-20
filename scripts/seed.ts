// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

import prisma, { Prisma } from '@/utils/prisma';

faker.locale = 'ja';

const createUser = async () => {
  const users: Prisma.UserCreateInput[] = await Promise.all(
    Array(10)
      .fill(0)
      .map(async () => ({
        name: faker.name.fullName(),
        passwordHash: await bcrypt.hash('12345678', 10),
        email: faker.internet.email(),
      })),
  );

  await prisma.user.createMany({
    data: users,
  });
};

const createRegister = async () => {
  const registers: Prisma.RegisterCreateInput[] = Array(10)
    .fill(0)
    .map(() => ({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      token: faker.datatype.uuid(),
    }));

  await prisma.register.createMany({
    data: registers,
  });
};

const main = async () => {
  await createUser();
  await createRegister();
};

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});
