const LoginService={
    onLogin,
    onFacebookLogin
}

function onLogin(formData){
    return fetch(`${process.env.REACT_APP_API_URL}/login/onLogin`,{
        method:"POST",
        body:formData
    }).then(function(res){ return res.json(); }).catch(err=>console.log(err));
}
function onFacebookLogin(){
    return fetch(`${process.env.REACT_APP_API_URL}/login/auth/facebook`,{
        method:"GET"
    }).then(function(res){ console.log(res) }).catch(err=>console.log(err));
}


export default LoginService
