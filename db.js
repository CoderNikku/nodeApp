// const { MongoClient } = require('mongodb');

// let dbConnection;
// const uri="mongodb://127.0.0.1:27017/bookstore";
// module.exports = {
//   connectToDb: (cb) => {
//     MongoClient.connect(uri)
//       .then((client) => {
//         dbConnection = client.db(); // Assign the database to dbConnection
//         return cb();
//       })
//       .catch((err) => {
//         console.log(err);
//         return cb(err);
//       });
//   },
//   getDb: () => dbConnection,
// };



const { MongoClient } = require('mongodb');

let dbConnection;
const username = 'nirmallohiya999';
const password = 'Sweet@12345';
const clusterName = 'cluster0';
const dbName = 'your-database-name'; // Replace with your actual database name

// URL encode the password to handle special characters
const encodedPassword = encodeURIComponent(password);

const uri = `mongodb+srv://${username}:${encodedPassword}@${clusterName}.nnui5rl.mongodb.net/${dbName}?retryWrites=true&w=majority`;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db(); // Assign the database to dbConnection
        return cb();
      })
      .catch((err) => {
        console.error(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
