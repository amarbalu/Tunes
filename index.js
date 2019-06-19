const express=require('express');
const path=require('path');
const formidableMiddleware = require('express-formidable');
const mongoose=require('./mongodb')
const app = express();
const port=process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, 'frontend/build')))
app.use(express.json())
app.use(formidableMiddleware())

app.get("/",(req,res)=>{
    res.json("Hello World")
})

app.post("/login_autenticate",(req,res)=>{
 res.send(req.fields)   
})
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
//   });

app.listen(port)