const { ObjectId } = require('mongodb');

const findByZip = (zipcode, collection, callback) => {
  collection.find({ zipcode }).toArray((err, items) => {
    if (err) {
      console.log(err);
    } else {
      callback(items);
    }
  });
};

const updateVote = async (id, collection, voteCount) => {
  const newCount = Number(Number(voteCount) + 1);
  // const filter = `_id: ObjectId('${id}')`;
  // const update = `$set: { upvotes: ${newCount} }`;
  await collection.updateOne({ _id: ObjectId(id) }, { $set: { upvotes: newCount } });
};

const updateNomination = async (id, collection, nomCount) => {
  const newCount = Number(Number(nomCount) + 1);
  // const filter = `_id: ObjectId('${id}')`;
  // const update = `$set: { upvotes: ${newCount} }`;
  await collection.updateOne({ _id: ObjectId(id) }, { $set: { nominations: newCount } });
};

exports.findByZip = findByZip;
exports.updateVote = updateVote;
exports.updateNomination = updateNomination;

// db.articles.updateOne({ _id: ObjectId('5ac039df4fac62982831c47f') }, { $set: { upvotes: 311 } });
