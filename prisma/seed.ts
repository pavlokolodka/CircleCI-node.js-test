import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "Arvid_Beer@hotmail.com",
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    photo: faker.image.avatar(),
    role: 'customer',
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
    email: "Aubree94@yahoo.com",
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    photo: faker.image.avatar(),
    role: 'admin',
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
    email: "Norbert_Sipes@hotmail.com",
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    role: 'volunteer',
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
    email: "Cassandre.Ernser25@gmail.com",
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    role: 'volunteer',
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
    email: "Lauren_Harvey@hotmail.com",
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    role: 'volunteer',
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
    email: "Alexzander49@gmail.com",
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    role: 'customer',
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
    email: "Keely_Cummings98@hotmail.com",
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    role: 'customer',
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
    email: "Deon_Johns@gmail.com",
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    photo: faker.image.avatar(),
    role: 'customer',
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
    email: "Clarissa.Kunze@gmail.com",
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    photo: faker.image.avatar(),
    role: 'customer',
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
    email: "Ulises_Dooley@gmail.com",
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    photo: faker.image.avatar(),
    role: 'customer',
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