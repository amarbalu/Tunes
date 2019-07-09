
import React from 'react';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {connect} from 'react-redux'


import './css/App.css';
import {Spin,Icon} from 'antd';
import Login from './pages/Login';

const history=createBrowserHistory();
const routes=[
{path:"/Login",component:Login}

,
{path:"/Register",component:Register}

,
{path:"/Dashboard",component:Dashboard},
]
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const Loader = props => <div className={props.isshow ? "spinner-back  show spinnerLayout" : "hide"}>
  
  <Spin  tip="Loading..." size="large" className={"spinner " + (props.isshow ? "show" : "hide")} 
  indicator={antIcon}  />

</div>
const App=(props)=> {

  return (
    <React.Fragment>
  
  <BrowserRouter history={history}>
   
<Switch>
 {routes.map((props, index) =>
 <Route exact path={props.path} component={props.component}/>)}
 
    

    <Redirect to="/Login"></Redirect> 
</Switch>  
  </BrowserRouter>
 
 <Loader isshow={props.loading}/>
 </React.Fragment>
 );
}
const mapStateToProps=state=>{
  return{
    loading:state.loginReducer.loading
  }
}
export default connect(mapStateToProps, null)(App);



