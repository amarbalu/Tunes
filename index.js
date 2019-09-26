const express=require('express');
const path=require('path');
const register =require('./Routes/Register');
const login =require('./Routes/Login');
const music =require('./Routes/Music');
const cors = require('cors');
const bodyParser=require('body-parser');
const session=require('express-session');
const passport=require('passport');
const multer  = require('multer');
const cookieParser = require('cookie-parser')
const upload = multer();
require('./mongodb');
const app = express();
const port=process.env.PORT || 4000;
app.use(express.static(path.join(__dirname, 'frontend/build')))
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: "tHiSiSasEcRetStr",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 60*60*1000
} }));
  app.use(passport.initialize());
  app.use(passport.session());
 
  require('./config/passport')(passport);

  app.post("/onLogin",upload.none(),
 passport.authenticate('local', {
failureRedirect: '/login/error' }),function(req, res) {
  res.send({"success":true,id:req.user,message:"Login success"})
})
app.get('/error',(req,res)=>{
  res.send({"success":false,message:"Invalid Crendentials"})
})

app.get("/login_auth",(req,res)=>{

  console.log(req.user)
  console.log(req.cookies)
  if(req.isAuthenticated()){
    res.send("Hi");
  }else{
    res.status(500).send("Error cannot proceed")
  }
})
app.get('/profile',(req,res)=>{
  res.send(req.user)
})
app.get('/auth/facebook',passport.authenticate('facebook'));
app.get("/auth/facebook/callback",passport.authenticate('facebook')
,function(req, res) {
      res.redirect("/Dashboard")
});
app.use("/register",register);
app.use("/login",login);
app.use("/music",music);
app.get("/logout",(req,res)=>{
  req.logOut();
  res.send({success:true,message:"logged out successfully"})
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
  });

app.listen(port)