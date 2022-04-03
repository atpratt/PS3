import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App'; //this is refering to the APP.js file
import reportWebVitals from './reportWebVitals';
//import {Route, BrowswerRoute as Router, Switch} from 'react-router-dom' 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
