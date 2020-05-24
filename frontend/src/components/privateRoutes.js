import React from "react";
import {Route,Redirect} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => (
  
    <Route {...rest} render={(props) => (
      rest.can_proceed === true
        ? <Component {...props} />
        : <Redirect to='/Login' />
    )} />
  )

  const mapStateToProps=state=>{
    return{
      loading:state.loginReducer.loading,
      can_proceed:state.loginReducer.can_proceed
  
    }
  }
  export default connect(mapStateToProps, null)(PrivateRoute);