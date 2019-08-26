const localStrategy=require('passport-local').Strategy;
const FacebookStrategy  =     require('passport-facebook').Strategy;
const bcrypt=require('bcrypt');
const {User}=require('../collections/UserCollection');
const config =require('./passport.config')



module.exports=function(passport){
    
    passport.serializeUser(function(user, done) {
    done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
      done(null, id);
    });
    

    
    passport.use(
        new localStrategy({usernameField:"email"},(email,password,done)=>{
           //Match User
           
           User.findOne({email:email}).then(
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
    passport.use(new FacebookStrategy({
        clientID: config.facebook_api_key,
        clientSecret:config.facebook_api_secret ,
        callbackURL: config.callback_url
      },
      function(accessToken, refreshToken, profile, done) {
       
          try{
          User.findOne({email:profile.id}).then(
            user=>{
                
                if(!user){
                    return done(null,false,{message:"Email is not registered"});
                }else{
                   const register =new User({
                        username:profile.name.givenName,
                       
                        email:profile.emails[0].value
                        
                    })
                  
                
                     register.save((err)=>{
                         if(err)
                         throw err
                         return(null,register)
                     });
                }
        });
          }catch(ex){
            console.log(ex)
          }
    }));
       
} 