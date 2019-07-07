 const express=require('express');
const path=require('path');
const register =require('./Routes/Register');
const login =require('./Routes/Login');
const music =require('./Routes/Music');
const cors = require('cors');
const bodyParser=require('body-parser');
const session=require('express-session');
const passport=require('passport');

require('./mongodb');
const app = express();
const port=process.env.PORT || 4000;
app.use(express.static(path.join(__dirname, 'frontend/build')))
app.use(cors());

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