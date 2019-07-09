const localStrategy=require('passport-local').Strategy;
const FacebookStrategy  =     require('passport-facebook').Strategy;
const bcrypt=require('bcrypt');
const {User}=require('../collections/UserCollection');



module.exports=function(passport){
    
    passport.serializeUser(function(user, done) {
    done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
      done(null, id);
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
        clientID: "1592180007582994",
        clientSecret:"05c00660a94a32b98b38392e003ce1dfa" ,
        callbackURL: "/login/authfacebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
          try{

              process.nextTick(function () {
          //Check whether the User exists or not using profile.id
          Register.findOne({email:profile.id}).then(
            user=>{
                
                if(!user){
                    return done(null,false,{message:"Email is not registered"});
                }else{
                    return(done,profile)
                }
        });
      })
          }catch(ex){
            console.log(ex)
          }
    //     process.nextTick(function () {
    //       //Check whether the User exists or not using profile.id
    //       Register.findOne({email:profile.id}).then(
    //         user=>{
                
    //             if(!user){
    //                 return done(null,false,{message:"Email is not registered"});
    //             }else{
    //                 return(done,user)
    //             }
    //     });
    //   })
    }));
       
} 