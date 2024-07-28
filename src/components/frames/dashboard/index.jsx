import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../../navbars/sidebar';
import TopbarNavigation from '../../navbars/topbar';

const DashBoard = ({ children }) => {
    const [isMobileScreen, setIsMobileScreen] = useState(false);
    // const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobileScreen(window.innerWidth < 768); // Define your breakpoint for mobile screens
        };

        // Initial check
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

export default DashBoard;
