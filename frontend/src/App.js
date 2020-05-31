
import React from 'react';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {connect} from 'react-redux'
import PrivateRoute from './components/privateRoutes';

import './css/App.css';
import {Spin} from 'antd';
import Login from './pages/Login';

const history=createBrowserHistory();
const routes=[
{path:"/loginpage",component:Login}

,
{path:"/registerpage",component:Register}

,
{path:"/dashboard",component:Dashboard},
{path:"/homepage",component:Homepage}
]

const antIcon = <img alt="tunes" src={require("./images/tunes_icon.svg")} style={{width:"60px",height:"60px"}}/>;
const Loader = props => <div className={props.isshow ? "spinner-back  show spinnerLayout" : "hide"}>
  
  <Spin size="large" className={"spinner " + (props.isshow ? "show" : "hide")} 
  indicator={antIcon}  />

</div>
const App=(propsValue)=> {
 
  return (
    <React.Fragment>
  
  <BrowserRouter history={history}>
   
<Switch>
 {routes.map((props, index) =>
 props.path === "/dashboard"?
 <PrivateRoute  exact key={props.path} path={props.path} component={props.component}/>
 : <Route exact key={props.path} path={props.path} component={props.component}/>

 )}
    

    <Redirect to="/homepage"></Redirect> 
</Switch>  
  </BrowserRouter>
 
 <Loader isshow={propsValue.loading}/>
 </React.Fragment>
 );
}
const mapStateToProps=state=>{
  return{
    loading:state.loginReducer.loading,
    can_proceed:state.loginReducer.can_proceed

  }
}
export default connect(mapStateToProps, null)(App);



