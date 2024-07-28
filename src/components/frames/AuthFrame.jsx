import { useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthFrame = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Quiz App | Authentication';

        const checkAuth = () => {
            try {
                const loggedIn = localStorage.getItem('loggedIn');
                if (loggedIn === 'true') {
                    navigate('/dashboard/add-quiz');
                }

            } catch (error) {
                console.error("Error while checking auth: ", error);
            }
        };

        setTimeout(() => {
            checkAuth();
        }, 2000);

        // eslint-disable-next-line
    }, []);

    return (
        <section className='bg-black w-full h-screen grid grid-cols-1 md:grid-cols-2'>
            <aside className='bg-[#181818] p-10 hidden md:block'>
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex'>
                        <h1>QUIZZY</h1>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, omnis reiciendis. Omnis similique amet odit non ?</p>
                </div>
            </aside>
            <aside className='my-auto px-8 col-span-2 md:col-span-1'>
                <h1 className='text-4xl font-medium my-8'>Sign Up</h1>
                {children}
            </aside>
        </section>
    )
}

export default memo(AuthFrame)
