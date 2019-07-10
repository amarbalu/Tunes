const RegisterService={
    onRegister,
    deleteRegister
}

function onRegister(formData){
    // http://localhost:4000
    return fetch(`${process.env.REACT_APP_API_URL}/register/onRegister`,{
        method:"POST",
       body:formData
    }).then(function(res){ return res.json(); }).catch(err=>console.log(err));
}
function deleteRegister(formData){
    return fetch(`${process.env.REACT_APP_API_URL}/register/deleteRegister`,{
        method:"POST",
       body:formData
    }).then(function(res){ return res.json(); }).catch(err=>console.log(err));
}

export default RegisterService;