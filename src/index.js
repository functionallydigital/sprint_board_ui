import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

global.apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
