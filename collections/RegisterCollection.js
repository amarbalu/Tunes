const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const registerSchema = new mongoose.Schema({
    username:{type:String,required:true,minlength:4,maxlength:20},
    password:{type:String,required:true,minlength:4,maxlength:1024},
    email:{type:String,required:true,minlength:4,maxlength:255},
    date:{type:Date,defaut:Date.now}
})
const Register = mongoose.model('Register',registerSchema);

const validateRegister=async(register)=>{
    const schema=Joi.object().keys({
        username:Joi.string().min(4).max(20).required(),
        password:Joi.string().min(4).max(1024).required(),
        email:Joi.string().min(4).max(255).required()

    })
      
        return await Joi.validate(register,schema);

}

const validateLogin=async(register)=>{
    const schemaLogin=Joi.object().keys({
        
        email:Joi.string().min(4).max(255).required(),
        password:Joi.string().min(4).max(1024).required()

    })
      
        return await Joi.validate(register,schemaLogin);

}
    module.exports.Register=Register;
    module.exports.validateRegister=validateRegister;
    module.exports.validateLogin=validateLogin;