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

  console.log('Categories seeding completed 🌱');

  
  // Seed data for Website projects
  await prisma.website.create({
    data: {
      name: 'E-commerce Admin',
      images: ['ecommerce.png', 'ecommerce1.png'],
      techs: [
        { name: 'React', description: 'Managed the dynamic and interactive components of the admin interface.' },
        { name: 'Next.js', description: 'Used for server-side rendering and building the frontend and backend of the e-commerce admin panel.' },
        { name: 'Postgres', description: 'Used as the relational database to store product details, user information, and transactions.' },
        { name: 'Node.js', description: 'Provided authentication, real-time data handling, and API routes for managing user and product data.' },
        { name: 'Prisma ORM', description: 'Interacted with the Postgres database to manage and query data through a simplified, type-safe API.' },
        { name: 'Tailwind CSS', description: 'Handled the styling and responsive design of the website with utility-first CSS classes.' },
      ],
      liveLink: 'https://ecommerce-admin-khaki-one.vercel.app/',
      githubLink: 'https://github.com/DeLeNoire/ecommerceAdmin',
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
      images: ['mlbot.png'],
      techs: [
        { name: 'Python', description: 'Programming language' },
        { name: 'TensorFlow', description: 'Machine learning framework' },
        { name: 'Pandas', description: 'Data manipulation library' },
        { name: 'Alpaca API', description: 'Stock trading API' },
      ],
      liveLink: '',
      githubLink: 'https://github.com/DeLeNoire/MLTradingBot',
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
      images: ['orderbook1.jpg', 'orderbook.jpg'],
      techs: [
        { name: 'C++', description: 'High-performance language' },
        { name: 'SQL', description: 'Database query language' },
        { name: 'Boost', description: 'Library for C++' },
      ],
      liveLink: '',
      githubLink: 'https://github.com/DeLeNoire/MultiTypeOrderBook',
      hooks: {
        create: [
          {
            title: 'Order Matching Engine',
            description: 'Matches buy and sell orders for multiple asset types.',
          },
        ],
      },
    },
  });

  // Seed data for Blockchain projects
  await prisma.blockChain.create({
    data: {
      name: 'DCEX',
      images: ['dcex.jpg', 'dcex1.jpg','dcex2.jpg','dcex3.jpg'],
      techs: [
        { name: 'JavaScript', description: 'Programming language for web development' },
        { name: 'Web3.js', description: 'Library for Ethereum development' },
        { name: 'React', description: 'JavaScript library for building user interfaces' },
        { name: 'Solidity', description: 'Smart contract programming' },
        { name: 'Ethereum', description: 'Blockchain platform' },
      ],
      liveLink: 'https://dcex-alpha.vercel.app/',
      githubLink: 'https://github.com/DeLeNoire/dcex',
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
      images: ['fractals.png'],
      techs: [
        { name: 'JavaScript', description: 'Scripting language for graphics' },
        { name: 'Canvas API', description: 'Graphics rendering API' },
        
      ],
      liveLink: 'https://fractals-trees.vercel.app/',
      githubLink: 'https://github.com/DeLeNoire/FRACTALS_TREE-RECURSION',
      hooks: {
        create: [
          {
            title: 'Fractal Generation',
            description: 'Generates complex fractal patterns using recursion.',
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
