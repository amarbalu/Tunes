const express=require('express');
const cors = require('cors');
const formidable = require('formidable');
const bodyParser=require('body-parser')
const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.json("Hello World")
})

app.post("/login_autenticate",(req,res)=>{
 res.send(req.body)
    
})

app.listen(8000)