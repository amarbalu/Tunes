
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
                "CSRF-Token":
                document.cookie.split("=")[0]==="XSRF-TOKEN"?
                document.cookie.split("=")[1]:
                document.cookie.split("=")[2]
            },
            method:type,
            credentials:'include',
            body:type!=="GET"?payload:null
        }).then(res=>res.json()).then(async res=>{
           await dispatch(loader(false))
           if(success){
           await success(res)}
        }).catch(async ex=>{
           await dispatch(loader(false))
           if(failure){
            await failure(ex)}
        })
    }
}

export default Fetch;