const localStrategy=require('passport-local').Strategy;
const FacebookStrategy  =     require('passport-facebook').Strategy;
const bcrypt=require('bcrypt');
const {User}=require('../collections/UserCollection');
const config =require('./passport.config')



module.exports=function(passport){
    
    passport.serializeUser(function(user, done) {
       
      
        done(null,user.id)
    });
    
    passport.deserializeUser(function(id, done) {   
        User.findById(id).then(user=>{

    done(null,user)

           
        })
    });
    

    
    passport.use('local',
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
    passport.use('facebook',new FacebookStrategy({
        clientID: config.facebook_api_key,
        clientSecret:config.facebook_api_secret ,
        callbackURL: config.callback_url
      },
      function(accessToken, refreshToken, profile, done) {
       
          try{
          User.findOne({'facebook.id':profile.id}).then(
            user=>{
                try{
                  
                if(!user){
                    const register =new User({
                         username:profile.displayName,
                        //  email:profile.emails[0].value,
                         facebook:{
                             id:profile.id,
                             token:accessToken
                         }
                        
                         
                     })
                   
                 
                      register.save((err)=>{
                          try{
                          if(err)
                          throw err
                          return done(null,profile.id)
                          }catch(ex){
                              return done(null,false,{message:"error in saving"})
                          }
                        });
                        }else{
                            return done(null,profile.id)
                        
                }
            }catch(ex){
                console.log(ex)
            }
        }).catch(ex=>{
            return done(null,false,{message:"error in saving"})
        })
          }catch(ex){
            console.log(ex)
          }
    }));
       
} 
