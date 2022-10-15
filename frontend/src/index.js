import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
// import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithConfig from './components/auth/Auth0ProviderWithConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Auth0ProviderWithConfig>  
        <App />
      </Auth0ProviderWithConfig>
);


