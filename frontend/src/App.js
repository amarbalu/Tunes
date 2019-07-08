
import React from 'react';

import Register from './pages/Register';

import Dashboard from './pages/Dashboard';

import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';

import './css/App.css';

import Login from './pages/Login';


const routes=[
{path:"/Login",component:Login}

,
{path:"/Register",component:Register}

,
{path:"/Dashboard",component:Dashboard},
]

const Loader = props => <div className={props.isshow ? "spinner-back  show spinnerLayout" : "hide"}>
  
  <Spin  tip="Loading..." size="large" className={"spinner " + (props.isshow ? "show" : "hide")} indicator={antIcon}  />

</div>
const App=()=> {

  return (
  
  <BrowserRouter>
   
<Switch>
 {routes.map((props, index) =>
 <Route exact path={props.path} component={props.component}/>
 
    
}
    <Redirect to="/Login"></Redirect> 
<Switch>  
  </BrowserRouter>
 
 //<Loader isshow={this.props.loading}/
 );
}

export default App;


// //.spinner-back.show {
//   opacity: .5!important;
// }

// .spinner-back.fade {
//   opacity: 0;
// }

// .spinner-back {
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 1040;
//   width: 100vw;
//   height: 100vh;
//   /* background-color: #000; */
//   background:rgba(0, 0, 0, 0.92)
// }
// //.spinner {
//   /* top: calc((90%-7%)/2);
//   left: calc((90%-7%)/2); */
//   position: absolute;
//   z-index: 100000;
//   opacity: 1;
// }

// .spinner.hide {
//   display: none;
// }
// .spinnerLayout{
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index:100000!important;
// }
