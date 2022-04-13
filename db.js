const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGO_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: async function (callback,dbname_=undefined) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      const dbname = dbname_ || (process.env.NODE_ENV === 'dev' ? 'development' : 'production')

      dbConnection = db.db(dbname);
      console.log(`Successfully connected to ${dbname} database`);

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};