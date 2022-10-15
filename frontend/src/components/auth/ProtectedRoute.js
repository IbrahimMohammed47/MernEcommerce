import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import PageLoader from '../misc/PageLoader';
import { useAuth0 } from '@auth0/auth0-react';

export const ProtectedRoute = ({ component }) => {
    const { getAccessTokenSilently } = useAuth0();

    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div className="page-layout">
                <PageLoader />
            </div>
        ),
    });
    return <Component getToken = {getAccessTokenSilently}/>;
};

export default ProtectedRoute;