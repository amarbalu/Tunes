const localStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');
const {Register}=require('../collections/RegisterCollection');



module.exports=function(passport){
    
    passport.serializeUser(function(user, done) {
    console.log(user)
    done(null, user);
    });
    
    passport.deserializeUser(function(id, done) {
    console.log(id)
      done(null, id);
    });
    
    passport.use(
        new localStrategy({usernameField:"email"},(email,password,done)=>{
           //Match User
           
           Register.findOne({email:email}).then(
                user=>{
                    
                    if(!user){
                        return done(null,false,{message:"Email is not registered"});
                    }
//Match Password

                    bcrypt.compare(password,user.password,(err,isMatch)=>{
                      
                        if(err)throw err;
                        
                        if(isMatch){
                          
                            return done(null,user)
                        }else{
                          return  done(null,false,{message:"Password is incorrect"});
                        }
                    })

                   
                }
            ).catch(err=>console.log(err));  
        })
    ) 
    
       
} 