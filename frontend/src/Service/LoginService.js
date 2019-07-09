const LoginService={
    onLogin,
    onFacebookLogin
}

function onLogin(formData){
    // http://localhost:4000
    return fetch('/login/onLogin',{
        method:"POST",
        // credentials: 'include',
        body:formData
    }).then(function(res){ return res.json(); }).catch(err=>console.log(err));
}
function onFacebookLogin(){
    // http://localhost:4000
    return fetch('/login/auth/facebook',{
        method:"GET",
        // body:JSON.stringify({"access_token":"EAAWoFEvFPRIBAAvGhG6NsdZB40t1Q0ErzZCUI2ZAMNZATSHmPolUByuFtbxUEhBAwBUqiYz8GiN2ZCMs8xSwcjbEp9RpR6fw0xZBxZBtVssgpy4X4i33UT5d1IXvgvcgHgo9b5hYC394N7LDbrV9HzTRwZB7GmU6HNIz2P0KZC9ViZCwZDZD"})
    }).then(function(res){ return res.json(); }).catch(err=>console.log(err));
}


export default LoginService
