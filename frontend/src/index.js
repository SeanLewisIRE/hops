import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from './reportWebVitals';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
const redirectURL = process.env.REACT_APP_REDIRECT_URL;

console.log(domain, clientId, audience, redirectURL)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-prmczu8a.eu.auth0.com"
        clientId="7synNevGl37rECv6tBS3Hv06mYduRgmL"
        redirectUri="https://localhost:3306/beerlist"
        audience="https://dev-prmczu8a.eu.auth0.com/api/v2/"
      > 
          <App className="h-screen"/>   
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
