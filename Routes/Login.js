const jwt=require('jsonwebtoken');
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
require('../config/passport')(passport);

app.use(session({
    secret: "tHiSiSasEcRetStr",
    resave: true,
    saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

app.post("/onLogin",upload.none(),
 passport.authenticate('local', {
failureRedirect: '/error' }),function(req, res) {
  res.send({"success":true,id:req.user.id,message:"Login success"})
})

app.get("/successRedirect",(req,res)=>{
    res.send(req.user)
})
app.get('/authfacebook',passport.authenticate('facebook',{session:false}, {
  failureRedirect: '/error' }),function(req, res) {
    
  res.send(req.user)
});




module.exports=app;