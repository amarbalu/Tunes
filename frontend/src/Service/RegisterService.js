const RegisterService={
    onRegister,
    deleteRegister
}

function onRegister(formData){
    return fetch('http://localhost:8000/register/onRegister',{
        method:"POST",
       body:formData
    }).then(function(res){ return res.json(); }).catch(err=>console.log(err));
}
function deleteRegister(formData){
    return fetch('http://localhost:8000/register/deleteRegister',{
        method:"POST",
       body:formData
    }).then(function(res){ return res.json(); }).catch(err=>console.log(err));
}

export default RegisterService;