const redis = require("redis");
const dbConfig = require("./config/database.config.js");
const redisClient = redis.createClient({
    host: dbConfig.redis_host,
    port: dbConfig.redis_port,
  });
  // if (process.env.NODE_ENV === "development") {
    redisClient.auth(dbConfig.redis_pwd, (err, response) => {
      if (err) {
        throw err;
      } else {
        console.log(response);
      }
    });
  // }
  module.exports.redisClient=redisClient;