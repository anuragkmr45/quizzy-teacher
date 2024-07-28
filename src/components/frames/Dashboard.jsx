import { useState, useEffect, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../navbars/Sidebar';
import TopbarNavigation from '../navbars/Topbar';

const DashBoard = ({ children }) => {
    const [isMobileScreen, setIsMobileScreen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobileScreen(window.innerWidth < 768);
        };

        // Initial check
        handleResize();

        setTimeout(() => {
            handleCheckAuth();
        }, 2000);

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };

        // eslint-disable-next-line
    }, []);

    const handleCheckAuth = useCallback(() => {
        try {
            const loggedIn = localStorage.getItem('authToken');
            if (!loggedIn) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error while checking auth: ', error);
        }
    }, [navigate]);

    return (
        <>
            {isMobileScreen ? (
                <TopbarNavigation children={children} />
            ) : (
                <SidebarNavigation children={children} />
            )}
        </>
    );
};

export default memo(DashBoard);
