import React from 'react';
import Register from './pages/Register';
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';


const App=()=> {

  return (
    <BrowserRouter>
    <Route exact path="/" component={Login}/>
    <Route exact path="/Register" component={Register}/>
    </BrowserRouter>
  );
}

export default App;
