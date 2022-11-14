import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const staticData = [
  ["Arvid_Beer@hotmail.com", 'customer'],
  ["Aubree94@yahoo.com", 'admin'],
  ["Norbert_Sipes@hotmail.com", 'volunteer'],
  ["Cassandre.Ernser25@gmail.com", 'volunteer'],
  ["Lauren_Harvey@hotmail.com", 'volunteer'],
  ["Alexzander49@gmail.com", 'customer'],
  ["Keely_Cummings98@hotmail.com", 'customer'],
  ["Deon_Johns@gmail.com", 'customer'],
  ["Clarissa.Kunze@gmail.com", 'customer'],
  ["Ulises_Dooley@gmail.com", 'customer'],
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
          // create: [
          //   {
          //     title: faker.commerce.product(),
          //     info: faker.commerce.productDescription(),
          //     photo: faker.image.business(),
          //     goal_amount: Number(faker.finance.amount()),
          //     sum: Number(faker.finance.amount()),
          //     short_info: faker.commerce.productDescription(),
          //     finished_at: faker.date.future()
          //   },
          //   {
          //     title: faker.commerce.product(),
          //     info: faker.commerce.productDescription(),
          //     photo: faker.image.business(),
          //     goal_amount: faker.finance.amount(),
          //     sum: faker.finance.amount(),
          //     short_info: faker.commerce.productDescription(),
          //     finished_at: faker.date.future(),
          //   },
          //   {
          //     title: faker.commerce.product(),
          //     info: faker.commerce.productDescription(),
          //     photo: faker.image.business(),
          //     goal_amount: faker.finance.amount(),
          //     sum: faker.finance.amount(),
          //     short_info: faker.commerce.productDescription(),
          //     finished_at: faker.date.future(),
          //   },
          //   {
          //     title: faker.commerce.product(),
          //     info: faker.commerce.productDescription(),
          //     photo: faker.image.business(),
          //     goal_amount: faker.finance.amount(),
          //     sum: faker.finance.amount(),
          //     short_info: faker.commerce.productDescription(),
          //     finished_at: faker.date.future(),
          //   },
          //   {
          //     title: faker.commerce.product(),
          //     info: faker.commerce.productDescription(),
          //     photo: faker.image.business(),
          //     goal_amount: faker.finance.amount(),
          //     sum: faker.finance.amount(),
          //     short_info: faker.commerce.productDescription(),
          //     finished_at: faker.date.future(),
          //   },
          //   {
          //     title: faker.commerce.product(),
          //     info: faker.commerce.productDescription(),
          //     photo: faker.image.business(),
          //     goal_amount: faker.finance.amount(),
          //     sum: faker.finance.amount(),
          //     short_info: faker.commerce.productDescription(),
          //     finished_at: faker.date.future(),
          //   },
          //   {
          //     title: faker.commerce.product(),
          //     info: faker.commerce.productDescription(),
          //     photo: faker.image.business(),
          //     goal_amount: faker.finance.amount(),
          //     sum: faker.finance.amount(),
          //     short_info: faker.commerce.productDescription(),
          //     finished_at: faker.date.future(),
          //   },
          // ]
        }
      },
    })
    
    const order = await prisma.order.create({
      data: {
        user_id: user.id,
        title: faker.commerce.product(),
        info: faker.commerce.productDescription(),
        photo: faker.image.business(),
        goal_amount: Number(faker.finance.amount()),
        sum: Number(faker.finance.amount()),
        short_info: faker.commerce.productDescription(),
        finished_at: faker.date.future(),
      }
    })
    
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