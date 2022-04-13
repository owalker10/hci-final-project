const argv = require("minimist-lite")(process.argv.slice(2));
const file = argv.file || argv.f;
const database = argv.d || argv.db || "development";
const command = argv._[0];

const data = require(`../${file}`);
const addData = async (db) => {
  for (const collection of Object.keys(data)) {
    if (data[collection].length > 0)
      await db.collection(collection).insertMany(data[collection]);
    console.log(
      `Inserted ${data[collection].length} documents into ${collection}`
    );
  }
};
const clear = async (db) => {
  for (const collection of Object.keys(data)) {
    if (await db.listCollections({ name: collection }).hasNext()) {
      await db.collection(collection).drop();
      console.log(`Removed all documents from ${collection}`);
    }
  }
};

require("dotenv").config();
const dbService = require("../db.js");
dbService.connectToServer(async (err) => {
  if (err) console.error(err);
  else {
    const db = dbService.getDb();
    try {
      switch (command) {
        case "put":
          await clear(db);
          await addData(db);
          break;
        case "add":
          await addData(db);
          break;
      }
    } catch (error) {
        console.error(error)
    }
  }
  process.exit();
}, database);
