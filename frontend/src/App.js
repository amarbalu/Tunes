import React from 'react';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import {BrowserRouter,Route,Redirect} from 'react-router-dom';
import './css/App.css';
import Login from './pages/Login';


const App=()=> {

  return (
    <BrowserRouter>
    <Route exact path="/Login" component={Login}/>
    <Route exact path="/Register" component={Register}/>
    <Route exact path="/Dashboard" component={Dashboard}/>
    {/* <Redirect to="/Login"></Redirect> */}
    </BrowserRouter>
  );
}

export default App;
