import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL ='http://dev.professoryapp.com:5000/'
axios.defaults.headers= 
{'x-auth-token': localStorage.getItem('x-auth-token'),
'Content-Type': 'application/json'}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('google_translate_element')
);
