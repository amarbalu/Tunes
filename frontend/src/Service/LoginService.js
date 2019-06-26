const LoginService={
    onLogin
}

function onLogin(formData){
    return fetch('/login/onLogin',{
        method:"POST",
        credentials: 'include',
        body:formData
    }).then(function(res){ return res.json(); }).catch(err=>console.log(err));
}

export default LoginService
