const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const connect = mongoose.createConnection(
    dbConfig.url
    , {
  useNewUrlParser: true,useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});


module.exports.connect=connect;
module.exports.mongoose=mongoose;


