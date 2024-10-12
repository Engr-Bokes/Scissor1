import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '../components/LoadingButton';

const Logout: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return <LoadingButton onClick={handleLogout} isLoading={isLoading} text="Logout" />;
};

export default Logout;
