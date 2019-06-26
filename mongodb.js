const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const RegisterCollection=require('./collections/RegisterCollection')

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});


module.exports=mongoose;