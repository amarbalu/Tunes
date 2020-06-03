const express = require("express");
const path = require("path");
const register = require("./Routes/Register");
const login = require("./Routes/Login");
const music = require("./Routes/Music");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const redis=require("redis");
const csrf=require('csurf');
const dbConfig = require('./config/database.config.js');
const redisClient=redis.createClient({
  host:dbConfig.redis_host,port:dbConfig.redis_port
});
if(process.env.NODE_ENV === "production"){

  redisClient.auth(dbConfig.redis_pwd,(err,response)=>{
  if(err){
    throw err
  }else{
    console.log(response)
  }
})
}
const redisStore=require('connect-redis')(session);
const upload = multer();
require("./mongodb");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors(process.env.NODE_ENV==="production"?{credentials: true}:{
  credentials: true,origin:"http://localhost:3000"
}));
app.use(
  session({
    secret: "tHiSiSasEcRetStr",
    name:'_redisPractice',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: process.env.NODE_ENV==="production"?false:true,
      maxAge:  60 * 60 * 1000
    },
    store:new redisStore({client:redisClient,ttl: 3600000})
  })
  );
  app.use(cookieParser());
  app.use(csrf())
app.use(passport.initialize());
app.use(passport.session());
const csrfMiddleware=(req,res,next)=>{
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrfToken = req.csrfToken();
  next();
}
app.use(csrfMiddleware)
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  res.status(403)
  res.send({err:true,message:"Invalid Csrf Token"})
})
app.use(express.static("frontend/build"));
const authCheck=(req,res,next)=>{
  if(req.user && req.user.id ){
    next()
  }else{
   
    res.status(401).json({message:"UnAuthorized"})
  }
}
require("./config/passport")(passport);



app.post(
  "/onLogin",
  upload.none(),
  passport.authenticate("local", {
    failureRedirect: "/login/error",
  }),
  function (req, res) {
    res.send({ success: true, id: req.user, message: "Login success" });
  }
);
app.get("/login/error",(req,res)=>{
  res.status(401).json({message:"Failed to Login"})
})
app.get("/error", (req, res) => {
  res.send({ success: false, message: "Invalid Crendentials" });
});

app.get("/login_auth",authCheck, (req, res) => {
 
  if (req.isAuthenticated()) {
    res.send({ status: true, message: "user autheticated" });
  } else {
    res.status(401).send({ status: false, message: "unAuthorised" });
  }
});
app.get("/profile",authCheck, (req, res) => {
  res.send(req.user);
});

app.use("/register", register);
app.use("/music",authCheck, music);
app.use("/login",authCheck, login);
app.get("/logout", (req, res) => {
  // res.clearCookie("_redisPractice", {domain: "127.0.0.1",path:'/'})
  //res.clearCookie("XSRF-TOKEN", {expires: new Date(),path:'/'})
  // res.cookie("_redisPractice", '', { expires: new Date(), path: '/' })
  req.logOut();
  //req.session.destroy();
  
  res.send({ success: true, message: "logged out successfully" });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,`frontend`,`build`,`index.html`));
});
app.listen(port);
