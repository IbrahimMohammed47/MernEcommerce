import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import PageLoader from '../misc/PageLoader';

export const ProtectedRoute = ({ component }) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div className="page-layout">
                <PageLoader />
            </div>
        ),
    });
    return <Component />;
};

export default ProtectedRoute;