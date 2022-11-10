import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    photo: faker.image.avatar(),
    role: faker.helpers.arrayElement(['customer', 'admin', 'volunteer']),
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
  {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    photo: faker.image.avatar(),
    role: faker.helpers.arrayElement(['customer', 'admin', 'volunteer']),
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
  {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    role: faker.helpers.arrayElement(['customer', 'admin', 'volunteer']),
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
  {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    role: faker.helpers.arrayElement(['customer', 'admin', 'volunteer']),
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
  {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    role: faker.helpers.arrayElement(['customer', 'admin', 'volunteer']),
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
  {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    role: faker.helpers.arrayElement(['customer', 'admin', 'volunteer']),
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
  {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    role: faker.helpers.arrayElement(['customer', 'admin', 'volunteer']),
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
  {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    photo: faker.image.avatar(),
    role: faker.helpers.arrayElement(['customer', 'admin', 'volunteer']),
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
  {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    photo: faker.image.avatar(),
    role: faker.helpers.arrayElement(['customer', 'admin', 'volunteer']),
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
  {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    photo: faker.image.avatar(),
    role: faker.helpers.arrayElement(['customer', 'admin', 'volunteer']),
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
]


async function main() {
  console.log(`Start seeding ...`);

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    
    console.log(`Created user with id: ${user.id}`);
  }

  console.log(`Seeding finished!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })