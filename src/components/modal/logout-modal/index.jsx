import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiEndpoints from '../../../services/api';
import Loader from '../../../components/loader/dotedCircel'

const LogoutModal = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCloseModal = async () => {
        try {
            const modalCheckbox = document.getElementById('logout-modal');
            if (modalCheckbox) {
                modalCheckbox.checked = false;
            }
        } catch (error) {
            console.error('Error while closing modal: ', error)
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            const res = await apiEndpoints.logout();

            if (res.status === 200) {
                handleCloseModal()
                navigate('/teacher-login');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            handleCloseModal()
            setLoading(false);
        }
    }

    return (
        <div>
            <input className="modal-state" id="logout-modal" type="checkbox" />
            <div className="modal">
                <label className="modal-overlay"></label>

                {
                    loading ? (
                        <Loader />
                    ) : (
                        <div className="modal-content flex flex-col gap-5">
                            {/* <h2 className="text-xl">Modal title 3</h2> */}
                            <span>
                                Sure You Want To Logout !!
                            </span>
                            <div className="flex gap-3">
                                <button className="btn btn-block" onClick={handleCloseModal}>Cancel</button>
                                <button className="btn btn-error btn-block" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default LogoutModal
