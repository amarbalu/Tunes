const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const RegisterCollection=require('./collections/RegisterCollection')

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
// RegisterCollection.createRegister();
// const loginSchema = new mongoose.Schema({
//     username:{type:String,required:true},
//     password:String,
//     date:{type:Date,defaut:Date.now},
//     isPublished:Boolean
// })

// const Login = mongoose.model('Login',loginSchema);
// async function createLogin(){
// const login=new Login({
//     // username:"balu",
//     password:"amarbalu1995",
//     isPublished:true
// })
// try{
// const result = await login.validate();
// console.log(result)
// }catch(ex){
//   console.log(ex.message)
// }
// }
// async function getlogin(){
//     const login=await Login.find({password: /.*balu.*/i}).select({password:1}).countDocuments();
//     console.log(login);
// }

// async function updateloginrecord(){
//  const search= await Login.find({username:"balu",password:"amarbalu1995"});
// updateById(search);
// }
// updateById=async(search)=>{
  
//   const login=await Login.findByIdAndUpdate("5d05c84c56ed9931706038b3",{
//     $set:{
//       isPublished:true
//     }
//   },{new:true})
//   // if(!login) return;
//   // login.set({
//   //   username:"nivi"
//   // })
//   // // login.username="balu";
//   // const res=await login.save();
//   console.log(login)
  
// }
// getlogin();
// updateloginrecord();
// createLogin()

module.exports=mongoose;