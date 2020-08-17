const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const {userSchema} = require("./collections/UserCollection");
const autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = global.Promise;
const connect = mongoose.createConnection(dbConfig.url , {useNewUrlParser: true,useUnifiedTopology: true})
autoIncrement.initialize(connect);
const User = connect.model('User',userSchema);


module.exports.connect=connect;
module.exports.mongoose=mongoose;
module.exports.User=User;

