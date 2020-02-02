const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,minlength:4,maxlength:20},
    password:{type:String,minlength:4,maxlength:1024},
    facebook:{type:Object},
    confirmPassword:{type:String,minlength:4,maxlength:1024},
    phoneNumber:{type:String,maxlength:10},
    email:{type:String,minlength:4,maxlength:255},
    date:{type:Date,defaut:Date.now}
})
const User = mongoose.model('User',userSchema);

const validateUser=async(user)=>{
    const schema=Joi.object().keys({
        username:Joi.string().min(4).max(20).required(),
        password:Joi.string().min(8).max(16),
        facebook:Joi.object(),
        confirmPassword:Joi.string().min(8).max(16),
        phoneNumber:Joi.string().min(4).max(1024),
        email:Joi.string().min(4).max(255)

    })
      
        return await Joi.validate(user,schema);

}

const validateLogin=async(user)=>{
    const schemaLogin=Joi.object().keys({
        email:Joi.string().min(4).max(255).required(),
        password:Joi.string().min(8).max(16).required()
    })
      
        return await Joi.validate(user,schemaLogin);

}
    module.exports.User=User;
    module.exports.validateUser=validateUser;
    module.exports.validateLogin=validateLogin;