
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
const Auth0ProviderWithConfig = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  // const callback = process.env.REACT_APP_AUTH0_CALLBACK;
  // const history = useNavigate();

  // const onRedirectCallback = (appState) => {
  //   console.log("HHHERERE")
  //   console.log(appState['returnTo'])
  //   history.push(appState['returnTo'] || window.location.pathname);
  // };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience={audience}
      // redirectUri='http://localhost:3000/profile'
      useRefreshTokens
      cacheLocation="localstorage"
      // onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithConfig;
