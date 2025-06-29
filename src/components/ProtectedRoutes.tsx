import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

const ProtectedRoutes = ({ allowedRoles }: ProtectedRouteProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const userData = localStorage.getItem('rci-user');
    const user = userData ? JSON.parse(userData) : null;
    const token = localStorage.getItem('token');
    useEffect(() => {
        setTimeout(() => {
            const checkAuth = () => {
                if (!token || !user) {
                    setIsAuthorized(false);
                    setIsLoading(false);
                    return;
                }
                if (allowedRoles && !allowedRoles.includes(user.role)) {
                    setIsAuthorized(false);
                    setIsLoading(false);
                    return;
                }

                setIsAuthorized(true);
                setIsLoading(false);
            };

            checkAuth();
        }, 1000);
    }, [allowedRoles]);

    if (isLoading) {
        return <div className='text-white' >Loading...</div>;
    }

    if (!user) {
        return <Navigate to={'/404NotFound'} />
    }

    if (!isAuthorized) {
        return <Navigate to={allowedRoles ? "/" : "/signin"} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;