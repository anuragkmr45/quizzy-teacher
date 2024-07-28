import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { CiHome } from 'react-icons/ci';
import { TiThMenuOutline } from "react-icons/ti";
import { FaRegFileExcel } from "react-icons/fa";

// import LogoutModal from '../../modal/logout-modal'

const TopBar = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header>
            <div className="navbar flex justify-between items-center bg-gray-800 text-white">
                <div className="navbar-start">
                    <Link className="navbar-item flex" to='/dashboard/add-quiz' >
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/quizzy-4f34e.appspot.com/o/logo.png?alt=media&token=d2271cac-936d-442c-94f6-9f9c6e61ee8e"
                            alt=""
                            loading='lazy'
                            className='h-14'
                        />
                        <p className='my-auto text-xl font-semibold'>
                            Quizzy
                        </p>
                    </Link>
                </div>
                <div className="navbar-end">
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary" tabIndex="0" onClick={toggleSidebar}>
                            <TiThMenuOutline />
                        </button>
                        {/* <label className="btn btn-solid-primary my-2" tabIndex="0">Click</label> */}
                        <div className="dropdown-menu dropdown-menu-bottom-left">
                            <Link to='/dashboard/add-quiz' className="dropdown-item text-sm flex flex-row menu-items">
                                <CiHome className='my-auto mx-2' />
                                <span>Add New Quiz</span>
                            </Link>
                            <Link to='/dashboard/make-quiz-live' className="dropdown-item text-sm flex flex-row menu-items">
                                <FaRegFileExcel className='my-auto mx-2' />
                                <span>Make Quiz Live</span>
                            </Link>
                            <Link to='/dashboard/previous-quizes' className="dropdown-item text-sm flex flex-row menu-items">
                                <CiHome className='my-auto mx-2' />
                                <span>Previous Quizes</span>
                            </Link>
                            <Link to='/dashboard/question-bank' className="dropdown-item text-sm flex flex-row menu-items">
                                <CiHome className='my-auto mx-2' />
                                <span>Question Bank</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {children}
            </div>
        </header>
    );
};

export default TopBar;
