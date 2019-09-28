import React from "react";
const loader=(value)=>{
   return{ 
    type:'LOADING_ACTION',
    loading:value
}
}
const Axios=(appendUrl,type,payload,success,failure,dispatch)=>{
    return dispatch=>{

        const apiUrl=`${process.env.REACT_APP_API_URL}${appendUrl}`;
        dispatch(loader(true))
         fetch(apiUrl,{
            method:type,
            credentials:'include',
            body:type!=="GET"?payload:null
        }).then(res=>{
            dispatch(loader(false))
            if(success){success(res)}
        }).catch(ex=>{
            dispatch(loader(false))
        })
    }
}

export default Axios;