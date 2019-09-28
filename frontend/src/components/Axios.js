import React from "react";

const Axios=(appendUrl,method,credentials)=>{
    const apiUrl=`${process.env.REACT_APP_API_URL}/login_auth`;
    return fetch(apiUrl,{
        method:"GET",
        credentials:'include'
    })
}

export default Axios;