function loginAuthentication(){
    return function (dispatch) {
        return fetchSecretSauce().then(
          response => dispatch(
              {
                type:'LOGIN_AUTH',
                can_proceed:true
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
    return fetch(`${process.env.REACT_APP_API_URL}/login/login_auth`,{
        method:"GET",
        credentials: 'include'
    })
}
export default loginAuthentication;