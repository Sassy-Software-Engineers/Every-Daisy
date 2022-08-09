'use strict';

const {
  db,
  models: { User, Order, Product, Category },
} = require('../server/db');

const users = [
  {
    username: 'admin@gmail.com',
    password: 'abc123',
    isAdmin: true,
    device: 'second-brain',
  },
  {
    username: 'kitty@cat.com',
    password: 'abc123',
    isAdmin: true,
    device: 'icat',
  },
  {
    username: 'pup@frenchie.com',
    password: 'abc123',
    isAdmin: false,
    device: 'barkpad',
  },
  {
    username: 'bob@bobby.com',
    password: 'abc123',
    isAdmin: false,
    device: 'cat-chewed-cable',
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
    title: 'Prayer plant',
    description:
      'The Calathea Orbifolia\'s broad, oval-shaped leaves with contrasting green stripes make it a popular plant for home decor and plant enthusiasts alike. Its lush foliage benefits from frequent waterings and high humidity. In ideal conditions (think tropical), its pet-friendly leaves can grow over a foot wide!',
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
  {
    title: 'Moth orchid',
    description:
      'Moth orchids are great year-round, but theyre especially well-suited for cold days when youre spending a lot of time indoors. Dont be intimidated by their exotic appearance. They need very little to thrive inside.',
    price: 48.99,
    quantity: 100,
    image:
      'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_white-orchid_bryant_black_variant.jpg?v=1658772624',
  },
  {
    title: 'Spider Plant',
    description:
      'Chlorophytum comosum, usually called spider plant or common spider plant due to its spider-like look, also known as spider ivy, ribbon plant, and hen and chickens is a species of evergreen perennial flowering plant of the family Asparagaceae.',
    price: 35.99,
    quantity: 100,
    image:
      'https://www.plantvine.com/plants/Variegated-Spider-Plant-2.jpg',
  },
  {
    title: 'Rattlesnake Plant',
    description:
      'Rattlesnake plants are not generally considered the best option for a beginners houseplant collection. They have very particular heat, light, and moisture requirements. However, it can be worth the extra effort when you see the beautiful ornamental leaves the plant produces.',
    price: 15.99,
    quantity: 50,
    image:
      'https://h2.commercev3.net/cdn.brecks.com/images/800/76430P.jpg',
  },
  {
    title: 'Venus FlyTrap',
    description:
      'Not only is this plant pet-friendly, it\'s also super low-maintenance. Keep your Venus flytrap happy by placing it somewhere that gets at least four hours of direct sunlight and watering it with distilled water.',
    price: 10.99,
    quantity: 150,
    image:
      'https://themellowsf.com/wp-content/uploads/2020/10/Venus-Fly-Trap-The-Mellow-SF-1-e1602374721627.jpg',
  },
  {
    title: 'Burro\'s Tail',
    description:
      'The Burro\'s Tail, Donkey Tail, or Sedum morganianum is a cross between a cactus and succulent. These charmers are easy to take care of and actually thrive if you leave them alone.',
    price: 15.99,
    quantity: 150,
    image:
      'https://cb2.scene7.com/is/image/CB2/PottedBurrosTailSHS20/$web_pdp_main_carousel_sm$/191203161844/faux-potted-burros-tail.jpg',
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
  { name: 'flowering' },
  { name: 'tropical' },
  { name: 'easy' },
  { name: 'advanced' },
  { name: 'cat-favorite' },
  { name: 'carniverous' },
  { name: 'succulent' },
];
async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

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
  
// newProducts[0].addCategory(newCategories[0])
// newProducts[1].setCategories(newCategories[2])
// newProducts[2].setCategories(newCategories[2])
// newProducts[3].setCategories(newCategories[1],newCategories[3])
// newProducts[4].setCategories(newCategories[1],newCategories[3])
// newProducts[5].setCategories(newCategories[2],newCategories[4])
// newProducts[6].setCategories(newCategories[3],newCategories[6])
// newProducts[7].setCategories(newCategories[3],newCategories[7])


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

if (module === require.main) {
  runSeed();
}
module.exports = seed;

