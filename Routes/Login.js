
const express=require('express');
const passport=require('passport');
const bodyParser=require('body-parser');
const cors = require('cors');
const app = express();
var multer  = require('multer');

const session=require('express-session');
const upload = multer();
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: "tHiSiSasEcRetStr",
  resave: true,
  saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  require('../config/passport')(passport);

app.post("/onLogin",upload.none(),
 passport.authenticate('local', {
failureRedirect: '/login/error' }),function(req, res) {
  res.send({"success":true,id:req.user,message:"Login success"})
})
app.get('/error',(req,res)=>{
  res.send({"success":false,message:"Invalid Crendentials"})
})
app.get("/auth/facebook/callback",passport.authenticate('facebook'
, {failureRedirect: '/login/error' }),function(req, res) {
    
  res.send({"success":true,id:req.user,message:" FB Login success"})
});
app.get("/login_auth",(req,res)=>{
  if(req.user){
    res.send(req.user);
  }else{
    res.status(500).send("Error cannot proceed")
  }
})
app.get('/profile',(req,res)=>{
  // res.send(req.user)
  // res.redirect("/dashboard")
})
app.get('/auth/facebook',passport.authenticate('facebook' ,{ 
  scope : ['public_profile', 'email']
}

));
// app.get('/auth/facebook',passport.authenticate('facebook'));




module.exports=app;
