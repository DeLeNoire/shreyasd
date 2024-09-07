import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed data for categories
  await prisma.category.createMany({
    data: [
      { name: 'Websites', icon: 'internet' },
      { name: 'AI Stuff', icon: 'ai' },
      { name: 'Quant', icon: 'research' },
      { name: 'Blockchain', icon: 'blockchain' },
      { name: 'Collabs', icon: 'collaborate' },
      { name: 'Miscellaneous', icon: 'everything' },
    ],
  });

  console.log('Categories seeding completed!');
  
  // Seed data for Website projects
  await prisma.website.create({
    data: {
      name: 'E-commerce Admin',
      images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
      techs: [
        { name: 'React', description: 'Frontend framework' },
        { name: 'Node.js', description: 'Backend runtime' },
      ],
      liveLink: 'https://ecommerce.com',
      githubLink: 'https://github.com/ecommerce-admin',
      hooks: {
        create: [
          {
            title: 'Admin Dashboard',
            description: 'Manages users, products, and orders.',
          },
        ],
      },
    },
  });

  // Seed data for AI projects
  await prisma.aI.create({
    data: {
      name: 'ML Trading Bot',
      images: ['bot1.jpg', 'bot2.jpg'],
      techs: [
        { name: 'Python', description: 'Programming language' },
        { name: 'TensorFlow', description: 'Machine learning framework' },
      ],
      liveLink: 'https://mltradingbot.com',
      githubLink: 'https://github.com/ml-trading-bot',
      hooks: {
        create: [
          {
            title: 'Trading Algorithm',
            description: 'Automates stock trading based on ML predictions.',
          },
        ],
      },
    },
  });

  // Seed data for Quant projects
  await prisma.quant.create({
    data: {
      name: 'Multitype Orderbook',
      images: ['orderbook1.jpg'],
      techs: [
        { name: 'C++', description: 'High-performance language' },
        { name: 'SQL', description: 'Database query language' },
      ],
      liveLink: 'https://multitypeorderbook.com',
      githubLink: 'https://github.com/multitype-orderbook',
      hooks: {
        create: [
          {
            title: 'Order Matching Engine',
            description: 'Matches buy and sell orders in real time.',
          },
        ],
      },
    },
  });

  // Seed data for Blockchain projects
  await prisma.blockChain.create({
    data: {
      name: 'DCEX',
      images: ['dcex1.jpg'],
      techs: [
        { name: 'Solidity', description: 'Smart contract programming' },
        { name: 'Ethereum', description: 'Blockchain platform' },
      ],
      liveLink: 'https://dcex.com',
      githubLink: 'https://github.com/dcex',
      hooks: {
        create: [
          {
            title: 'Decentralized Exchange',
            description: 'Facilitates token trades using smart contracts.',
          },
        ],
      },
    },
  });

  // Seed data for Collab projects
  await prisma.collab.create({
    data: {
      name: 'FuzzyLogic',
      images: ['fuzzy1.jpg'],
      techs: [
        { name: 'Python', description: 'Programming language' },
        { name: 'Matplotlib', description: 'Data visualization library' },
      ],
      liveLink: 'https://fuzzylogic.com',
      githubLink: 'https://github.com/fuzzylogic',
      hooks: {
        create: [
          {
            title: 'Fuzzy Logic Engine',
            description: 'Implements a fuzzy inference system.',
          },
        ],
      },
    },
  });

  // Seed data for Miscellaneous projects
  await prisma.miscellaneous.create({
    data: {
      name: 'Fractals',
      images: ['fractals1.jpg'],
      techs: [
        { name: 'JavaScript', description: 'Scripting language for graphics' },
        { name: 'Canvas API', description: 'Graphics rendering API' },
      ],
      liveLink: 'https://fractals.com',
      githubLink: 'https://github.com/fractals',
      hooks: {
        create: [
          {
            title: 'Fractal Generation',
            description: 'Generates complex fractal patterns.',
          },
        ],
      },
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
