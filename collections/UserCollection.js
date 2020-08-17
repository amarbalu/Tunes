
const {Schema}=require("mongoose")
 
const Joi = require('@hapi/joi');

const userSchema = new Schema({
    username:{type:String,required:true,minlength:4,maxlength:20},
    password:{type:String,minlength:4,maxlength:1024},
    facebook:{type:Schema.Types.ObjectId},
    confirmPassword:{type:String,minlength:4,maxlength:1024},
    phoneNumber:{type:String,maxlength:10},
    email:{type:String,minlength:4,maxlength:255},
    date:{type:Date,defaut:Date.now}
})

const validateUser=async(user)=>{
    const schema=Joi.object().keys({
        username:Joi.string().min(4).max(20).required(),
        password:Joi.string().min(8).max(16),
        facebook:Joi.object(),
        confirmPassword:Joi.string().min(8).max(16),
        phoneNumber:Joi.string().min(4).max(1024),
        email:Joi.string().min(4).max(255),
        date:Joi.date()

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
    module.exports.userSchema=userSchema;
    module.exports.validateUser=validateUser;
    module.exports.validateLogin=validateLogin;