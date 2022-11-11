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
          create: [
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription()
            },
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription()
            },
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription()
            },
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription()
            },
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription()
            },
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription()
            },
            {
              title: faker.commerce.product(),
              info: faker.commerce.productDescription()
            },
          ]
        }
      },
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