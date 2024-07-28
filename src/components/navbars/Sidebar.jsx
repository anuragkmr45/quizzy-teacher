import React from 'react'
import { Link } from 'react-router-dom';

import LogoutModal from '../modal/LogoutModal';
// import Loader from '../../loader/dotedCircel';

import { CiDatabase } from "react-icons/ci";
import { FaRegFileExcel } from "react-icons/fa";

const SidebarNavigation = ({ children }) => {

    return (
        <div className="sticky flex h-screen flex-row gap-4 overflow-y-auto rounded-lg sm:overflow-x-hidden">
            <aside className="sidebar-sticky sidebar justify-start">
                <section className="sidebar-title items-center p-4 cursor-pointer">
                    <svg fill="none" height="42" viewBox="0 0 32 32" width="42" xmlns="http://www.w3.org/2000/svg">
                        <rect height="100%" rx="16" width="100%"></rect>
                        <path clipRule="evenodd" d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z" fill="currentColor" fillRule="evenodd"></path>
                    </svg>
                    <div className="flex flex-col">
                        <span className='text-lg' >Quiz App </span>
                        <span className="text-xs font-normal text-content2">SOA Quiz App</span>
                    </div>
                </section>
                <section className="sidebar-content">
                    <nav className="menu rounded-md">
                        <section className="menu-section px-4">
                            <span className="menu-title">Main menu</span>
                            <ul className="menu-items">
                                <li className="menu-item">
                                    <Link to='/dashboard/add-quiz' className='flex' >
                                        <FaRegFileExcel className='my-auto mx-2' />
                                        <span>Add New Quiz</span>
                                    </Link>
                                </li>

                                <li className="menu-item">
                                    <Link to='/dashboard/previous-quizes' className='flex' >
                                        <CiDatabase className='my-auto mx-2' />
                                        <span>Previous Quizes</span>
                                    </Link>
                                </li>

                                <li className="menu-item">
                                    <Link to='/dashboard/question-bank' className='flex' >
                                        <CiDatabase className='my-auto mx-2' />
                                        <span>Question Bank</span>
                                    </Link>
                                </li>
                            </ul>
                        </section>
                    </nav>
                </section>
                <section className="sidebar-footer bg-gray-2 pt-2">
                    <div className="divider my-0"></div>
                    {/* <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4"> */}
                    <label className="whites mx-2 flex h-fit w-full cursor-pointer" tabIndex="0">
                        <label
                            className='btn btn-outline-error my-2 w-4/5 text-center mx-auto'
                            htmlFor='logout-modal'
                        >
                            LogOut
                        </label>
                    </label>
                    {/* </div> */}
                </section>
            </aside>
            <div className="px-2 py-5 w-full h-full">
                {/* {
                    loading ? (
                        <Loader />
                    ) : ( */}
                {children}
                {/* )
                } */}
            </div>
            <LogoutModal />
        </div>
    )
}

export default SidebarNavigation
