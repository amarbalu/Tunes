import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/antdcss.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './Reducer/rootReducer';
import { Provider } from "react-redux";
import  loginAuthentication from './loginAuthentication';
import { createStore,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
require('dotenv').config({path: __dirname + '/.env'})
const store=createStore(rootReducer,
    applyMiddleware(thunk));
    window.addEventListener("click",()=>{
       if(document.cookie.indexOf("XSRF-TOKEN")===-1){
               store.dispatch(loginAuthentication())
       }
    })
    store.dispatch(loginAuthentication())
ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
