'use strict';

const {
  db,
  models: { User, Order, Product, Category },
} = require('../server/db');

const users = [
  {
    username: 'admin@gmail.com',
    password: 'abc123',
    // name: 'alec',
    // address: '123 Long Island Rd',
    isAdmin: true,
  },
  {
    username: 'kitty@cat.com',
    password: 'abc123',
    // name: 'Kitty',
    // address: '33 Catnip Dr, St. Louis, MO',
    isAdmin: true,
  },
  {
    username: 'pup@frenchie.com',
    password: 'abc123',
    // name: 'Oscar',
    // address: '123 Blue Hill Drive, Blue Hill, ME',
    isAdmin: false,
  },
  {
    username: 'bob@bobby.com',
    password: 'abc123',
    // name: 'bobby',
    // address: '1 Chicago way, IL',
    isAdmin: false,
  },
];

const products = [
  {
    title: 'Catnip',
    description: 'Cats love it!',
    price: 3.99,
    quantity: 100,
    image:
      'https://image.petmd.com/files/styles/article_image/public/2020-11/picture-of-catnip.jpg?VersionId=Kb2rnqmWlgZH6oXcbEIeZ.4DH9DPmJ0o&itok=m6TAYZXT',
  },
  {
    title: 'Calathea Orbifolia',
    description:
      'The Calathea Orbifolia’s broad, oval-shaped leaves with contrasting green stripes make it a popular plant for home decor and plant enthusiasts alike. Its lush foliage benefits from frequent waterings and high humidity. In ideal conditions (think tropical), its pet-friendly leaves can grow over a foot wide!',
    price: 36.0,
    quantity: 100,
    image:
      'https://cdn.shopify.com/s/files/1/1811/2867/products/Prayer_Plant_6_WP_1800x1800.jpg?v=1581352556',
  },
  {
    title: 'Bromeliad Antonio Pink',
    description:
      'The “pink” in Bromeliad Antonio Pink describes the fuchsia bracts found in this cultivar, which sometimes produce short-blooming purple flowers. Its vibrant bract also gives it its nickname, the Pink Quill Plant.',
    price: 56.5,
    quantity: 100,
    image:
      'https://bloomscape.com/wp-content/uploads/2021/09/bloomscape_bromeliad-summer_small_slate.jpg?ver=596856',
  },
];

const orders = [
  {
    quantity: 2,
    status: 'SHIPPED',
  },
  {
    quantity: 1,
  },
  {
    quantity: 1,
    status: 'DELIVERED',
  },
];
const categories = [
  { name: 'herb' },
  {
    name: 'flowering',
  },
  { name: 'tropical' },
];
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');
  // Creating Users

  const [newUsers] = await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );
  const [newProducts] = await Promise.all(
    products.map((product) => {
      return Product.create(product);
    })
  );
  const [newOrders] = await Promise.all(
    orders.map((order) => {
      return Order.create(order);
    })
  );
  const [newCategories] = await Promise.all(
    categories.map((c) => Category.create(c))
  );

  console.log(
    `seeded ${users.length} users, ${products.length} products, ${orders.length} orders, ${categories.length} categories`
  );
  return (
    newUsers.dataValues,
    newProducts.dataValues,
    newOrders.dataValues,
    newCategories.dataValues
  );
}
/*  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}*/
async function runSeed() {
  console.log('seeding with runSeed...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('seeding success');
    await db.close();
    console.log('db connection closed');
  }
}
/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}
module.exports = seed;
