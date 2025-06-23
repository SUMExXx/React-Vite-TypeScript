import React from 'react';
import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (
    { 
        children
    }: {
        children: ReactNode;
    }) => {
    // const { user } = useSelector((state) => state.user);
    const user = ""
    if (user == null) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;