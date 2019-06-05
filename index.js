const express=require('express');
const cors = require('cors');
const path=require('path');
const formidable = require('formidable');
const bodyParser=require('body-parser')
const app = express();
app.use(express.static(path.join(__dirname, 'frontend/build')))
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.json("Hello World")
})

app.post("/login_autenticate",(req,res)=>{
 res.send(req.body)
    
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
  });

app.listen(8000)