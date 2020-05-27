
const loader=(value)=>{
   return{ 
    type:'LOADING_ACTION',
    loading:value
}
}
const Fetch=(appendUrl,type,payload,success,failure)=>{
    return async dispatch=>{
      await  dispatch(loader(true))
      await   fetch(`${process.env.REACT_APP_API_URL}${appendUrl}`,{
            headers:{
                "CSRF-Token":document.cookie.split("=")[1]
            },
            method:type,
            credentials:'include',
            body:type!=="GET"?payload:null
        }).then(res=>res.json()).then(async res=>{
           await dispatch(loader(false))
           
           await success(res)
        }).catch(async ex=>{
           await dispatch(loader(false))
            await failure(ex)
        })
    }
}

export default Fetch;