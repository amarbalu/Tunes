import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/antdcss.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "@babel/polyfill";
require('es6-object-assign').polyfill();
require("es6-promise").polyfill();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
