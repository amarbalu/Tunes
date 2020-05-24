function loginAuthentication(){
    return function (dispatch) {
        return fetchSecretSauce().then(
          response => dispatch(
              {
                type:'LOGIN_AUTH',
                can_proceed:response.status
              }
          )
        ).catch(
            ex=>
            dispatch( {
                type:'LOGIN_AUTH',
                can_proceed:false
              })
        );
      };
}

function fetchSecretSauce(){
    return fetch(`${process.env.REACT_APP_API_URL}/login_auth`,{
        method:"GET",
        credentials:'include'
    })
}
async function AuthCheck(){
  try{
 await fetchSecretSauce();
 return true
  }catch(ex){
    return false
  }

}
export{AuthCheck};
export default loginAuthentication;