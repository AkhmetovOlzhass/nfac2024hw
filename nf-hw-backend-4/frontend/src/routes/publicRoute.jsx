
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
    const { authToken } = useAuth();

    if (authToken) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PublicRoute;