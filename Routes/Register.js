const express=require('express');
const app = express();
const formidableMiddleware = require('express-formidable');
const {validateRegister,Register}=require('../collections/RegisterCollection');
const bcrypt=require('bcrypt');
app.use(express.json())
app.use(formidableMiddleware())

app.post("/onRegister",async(req,res)=>{
    
    let register;
    try{
          await validateRegister(req.fields);
    }catch(ex){
        return res.status(400).send(ex.details[0].message);
    }
    
   
     register=await Register.findOne({email:req.fields.email});
    if(register)
    return res.status(400).send("User already Registered");
    const{username,password,email}=req.fields;
     register =new Register({
        username,
        password,
        email
    })
    const salt=await bcrypt.genSalt(10);
   const hashed= await bcrypt.hash(req.fields.password,salt);
   register.password=hashed;

    const result=await register.save();
   return res.send(result)
   
    
})


app.post("/deleteRegister",async(req,res)=>{
let register=await Register.findOne({email:req.fields.email})
if(register)
{
await Register.deleteOne({email:register.email})
return res.send("Record Deleted Successfully")
}else{
    res.status(400).send("No such record found")
}
})
module.exports=app;