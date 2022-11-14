import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const staticData = [
  ["Arvid_Beer@hotmail.com", 'customer'],
  ["Aubree94@yahoo.com", 'volunteer'],
  ["Norbert_Sipes@hotmail.com", 'volunteer'],
  ["Cassandre.Ernser25@gmail.com", 'volunteer'],
  ["Lauren_Harvey@hotmail.com", 'volunteer'],
  ["Alexzander49@gmail.com", 'customer'],
  ["Keely_Cummings98@hotmail.com", 'customer'],
  ["Deon_Johns@gmail.com", 'customer'],
  ["Clarissa.Kunze@gmail.com", 'customer'],
  ["Ulises_Dooley@gmail.com", 'customer'],
]

const adminEmails = [
  'admin_kraud@hotmail.com',
  'admin_kraud@gmail.com',
  'admin1_kraud@hotmail.com',
  'admin2_kraud@hotmail.com',
]

async function main() {
  console.log(`Start seeding ...`);

  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: staticData[i][0],
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        photo: faker.image.avatar(),
        //@ts-ignore
        role: staticData[i][1],
        orders: {
          create: [
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription(),
              photo: faker.image.business(),
              goal_amount: Number(faker.finance.amount()),
              sum: Number(faker.finance.amount()),
              short_info: faker.commerce.productDescription(),
              finished_at: faker.date.future(),
            },
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription(),
              photo: faker.image.business(),
              goal_amount: Number(faker.finance.amount()),
              sum: Number(faker.finance.amount()),
              short_info: faker.commerce.productDescription(),
              finished_at: faker.date.future(),
            },
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription(),
              photo: faker.image.business(),
              goal_amount: Number(faker.finance.amount()),
              sum: Number(faker.finance.amount()),
              short_info: faker.commerce.productDescription(),
              finished_at: faker.date.future(),
            },
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription(),
              photo: faker.image.business(),
              goal_amount: Number(faker.finance.amount()),
              sum: Number(faker.finance.amount()),
              short_info: faker.commerce.productDescription(),
              finished_at: faker.date.future(),
            },
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription(),
              photo: faker.image.business(),
              goal_amount: Number(faker.finance.amount()),
              sum: Number(faker.finance.amount()),
              short_info: faker.commerce.productDescription(),
              finished_at: faker.date.future(),
            },
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription(),
              photo: faker.image.business(),
              goal_amount: Number(faker.finance.amount()),
              sum: Number(faker.finance.amount()),
              short_info: faker.commerce.productDescription(),
              finished_at: faker.date.future(),
            },
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription(),
              photo: faker.image.business(),
              goal_amount: Number(faker.finance.amount()),
              sum: Number(faker.finance.amount()),
              short_info: faker.commerce.productDescription(),
              finished_at: faker.date.future(),
            },
          ]
        }
      },
    })

    if (i < 4) {
      const admin = await prisma.admin.create({
        data: {
          email: adminEmails[i],
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
          photo: faker.image.avatar(),
        }
      })

      console.log(`Created admin with id: ${admin.id}`);
    }

    console.log(`Created user with id: ${user.id}`);
  }

  console.log(`Seeding finished!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect())