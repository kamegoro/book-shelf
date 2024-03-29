/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

import prisma, { Prisma } from '../src/utils/prisma';

/*
  Databaseのリセット・シードデータの作成処理なので本番環境では実行しないでください。
*/

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

const createBooks = async () => {
  const users = await prisma.user.findMany();
  if (!users.length) return;

  await Promise.all(
    users.map(async (user) => {
      const books: Prisma.BookCreateManyInput[] = Array(30)
        .fill(0)
        .map(() => ({
          authorId: user.id,
          title: faker.animal.cat(),
          description: faker.commerce.productDescription(),
          image: '', // Note: 時間がある時に、fakerのimageURLをbase64に変換して保存したい
        }));

      await prisma.book.createMany({
        data: books,
      });
    }),
  );
};

const main = async () => {
  console.log(`
    -------------------------------

      Data seeding in progress...

    -------------------------------
  `);
  await createUser();
  await createRegister();
  await createBooks();
};

main()
  .then(() => {
    console.log(`
    -------------------------------

      Data seeded successfully!

    -------------------------------
  `);
    console.log('Data seeded successfully!');
    // Note: Nodeプロセスが正常終了した場合に呼び出す
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    console.log(`
    -------------------------------

          Data seeding failed.

    -------------------------------
  `);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
