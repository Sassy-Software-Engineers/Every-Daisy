'use strict';

const { db } = require('../server/db');
const User = require('../server/db/models/User');
const Product = require('../server/db/models/Product');

const users = [
  {
    username: 'admin@gmail.com',
    password: 'abc123',
    name: 'alec',
    address: '123 Long Island Rd',
    status: 'ADMIN',
  },
  {
    username: 'kitty@cat.com',
    password: 'abc123',
    name: 'Kitty',
    address: '33 Catnip Dr, St. Louis, MO',
    status: 'ADMIN',
  },
  {
    username: 'pup@frenchie.com',
    password: 'abc123',
    name: 'Oscar',
    address: '123 Blue Hill Drive, Blue Hill, ME',
    status: 'MEMBER',
  },
  {
    username: 'bob@bobby.com',
    password: 'abc123',
    name: 'bobby',
    address: '1 Chicago way, IL',
    status: 'MEMBER',
  },
];

const products = [
  {
    title: 'Catnip',
    description: 'Cats love it!',
    price: '3.99',
    quantity: 100,
    image:
      'https://image.petmd.com/files/styles/article_image/public/2020-11/picture-of-catnip.jpg?VersionId=Kb2rnqmWlgZH6oXcbEIeZ.4DH9DPmJ0o&itok=m6TAYZXT',
  },
  {
    title: 'Calathea Orbifolia',
    description:
      'The Calathea Orbifolia’s broad, oval-shaped leaves with contrasting green stripes make it a popular plant for home decor and plant enthusiasts alike. Its lush foliage benefits from frequent waterings and high humidity. In ideal conditions (think tropical), its pet-friendly leaves can grow over a foot wide!',
    price: '36.00',
    quantity: 100,
    image:
      'https://cdn.shopify.com/s/files/1/1811/2867/products/Prayer_Plant_6_WP_1800x1800.jpg?v=1581352556',
  },
  {
    title: 'Bromeliad Antonio Pink',
    description:
      'The “pink” in Bromeliad Antonio Pink describes the fuchsia bracts found in this cultivar, which sometimes produce short-blooming purple flowers. Its vibrant bract also gives it its nickname, the Pink Quill Plant.',
    price: '56.00',
    quantity: 100,
    image:
      'https://bloomscape.com/wp-content/uploads/2021/09/bloomscape_bromeliad-summer_small_slate.jpg?ver=596856',
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
    await Promise.all(
      products.map((product) => {
        return Product.create(product);
      })
    );
  } catch (err) {
    console.log(err);
  }
};

// async function seed() {
//   await db.sync({ force: true }); // clears db and matches models to tables
//   console.log('db synced!');

//   // Creating Users
//   const users = await Promise.all([
//     User.create({ username: 'cody', password: '123' }),
//     User.create({ username: 'murphy', password: '123' }),
//   ]);

//   console.log(`seeded ${users.length} users`);
//   console.log(`seeded successfully`);
//   return {
//     users: {
//       cody: users[0],
//       murphy: users[1],
//     },
//   };
// }

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
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

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
