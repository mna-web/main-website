const { MongoClient } = require('mongodb');
const faker = require('faker');

const dbHost = process.env.DATABASE_HOST || 'localhost';

async function seedDB(dbcount, collection, client) {
  const totalEntries = 1000;
  const entriesPerCycle = 100;
  const cycles = Math.ceil(totalEntries / entriesPerCycle);

  const tags = ['shoutOut', 'complaint', 'callToAction'];
  const cities = [
    'San Francisco',
    'Daly City',
    'Milbrae',
    'Oakland',
    'San Rafael',
    'Richmond',
    'Walnut Creek',
    'Santa Rosa',
    'Palo Alto',
    'Union City',
    'Redwood City',
    'Santa Clara',
  ];
  const counties = ['San Francisco', 'Marin', 'Oakland', 'Bay Area'];

  for (let x = 0; x < cycles; x++) {
    const bulkEntries = [];
    for (let i = 1; i <= entriesPerCycle; i++) {
      const story = {
        id: i + dbcount,
        photo_url: `https://picsum.photos/640/480/?image=${Math.floor(Math.random() * 1000)}`,
        author: faker.name.findName(),
        title: faker.lorem.words(Math.ceil(Math.random() * 5)),
        text: faker.lorem.paragraphs(Math.ceil(Math.random() * 5)),
        zipcode: Math.round(Math.random() * 50) + 94108,
        city: cities[Math.round(Math.random() * (cities.length - 1))],
        county: counties[Math.round(Math.random() * (counties.length - 1))],
        state: 'California',
        upvotes: Math.round(Math.random() * 500),
        nominations: Math.round(Math.random() * 250),
        tag: tags[Math.floor(Math.random() * (tags.length - 1))],
      };
      bulkEntries.push({ insertOne: story });
    }
    await collection.bulkWrite(bulkEntries, { ordered: false });
  }
  console.log('indexing...');
  await collection.createIndex({ id: 1 });
  console.log('indexing complete.');
  console.log('Seeding process complete yaaay!');
  client.close();
}

MongoClient.connect(
  `mongodb://${dbHost}/`,
  async (err, client) => {
    if (err) {
      throw err;
    } else {
      const db = client.db('community-news');
      const collection = db.collection('stories');
      const databaseCount = await collection.count();

      console.log('Seeding process initiated...');
      seedDB(databaseCount, collection, client);
    }
  },
);
