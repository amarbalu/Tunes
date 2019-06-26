const RegisterService={
    onRegister,
    deleteRegister
}

function onRegister(formData){
    return fetch('/register/onRegister',{
        method:"POST",
       body:formData
    }).then(function(res){ return res.json(); }).catch(err=>console.log(err));
}
function deleteRegister(formData){
    return fetch('/register/deleteRegister',{
        method:"POST",
       body:formData
    }).then(function(res){ return res.json(); }).catch(err=>console.log(err));
}

export default RegisterService;