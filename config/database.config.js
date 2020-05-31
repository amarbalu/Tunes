module.exports={
    url:
    process.env.NODE_ENV!=="production"? "mongodb://localhost:27017/app":
 "mongodb+srv://amarbalu:Ab%4013abc@musicapp-favr0.mongodb.net/test?retryWrites=true&w=majority",
 redis_host:process.env.NODE_ENV!=="production"?"127.0.0.1":"redis-15677.c232.us-east-1-2.ec2.cloud.redislabs.com",
 redis_port:process.env.NODE_ENV!=="production"?6379:15677,
 redis_pwd:"Ab8qP1TcWVvAIXX5FGYo4yc5pYEjoZrP"
}