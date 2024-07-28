import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import CryptoJS from 'crypto-js';
import apiEndpoints from '../../../../services/api';

import DashBoard from '../../../../components/frames/dashboard';
import { showSuccessToast, showErrorToast } from '../../../../components/tosters/notifications'

const LiveQuizes = () => {
    const [quizId, setQuizId] = useState('');
    const [quizPass, setQuizPass] = useState('');
    const [quizCredentails, setQuizCredentails] = useState();
    const [loading, setLoading] = useState(false)
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        let intervalId;
        if (showQR) {
            intervalId = setInterval(() => {
                handlegetQr();
            }, 5000);
        }

        return () => {
            clearInterval(intervalId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showQR]);

    const handlegetQr = () => {
        try {
            const qrExpire = new Date().getTime() + 5000;

            const encryptedQuizId = encryptData(quizId);
            const encryptedPassword = encryptData(quizPass);

            const credentials = {
                expireDate: qrExpire,
                quizId: encryptedQuizId,
                password: encryptedPassword
            };

            setQuizCredentails(credentials)
        } catch (error) {
            console.error('Error while generating qr: ', error)
        }
    }

    const handleEndQuiz = async () => {
        setLoading(true)
        try {
            const res = await apiEndpoints.endQuiz(quizId)

            if (res.data.success) {
                setShowQR(false)
            }
        } catch (error) {
            console.error('Error while ending quiz: ', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            if (quizId === '') {
                showErrorToast('Quiz Id is required !!')
            }

            if (quizId !== '') {
                const response = await apiEndpoints.createLiveQuiz({ quizId });

                if (response.status === 200) {
                    setQuizPass(response.data.RoomPassword)
                    // console.log('response.data: ', response.data)
                    showSuccessToast('Quiz Is Live Now ')

                    handlegetQr()

                    setShowQR(true);
                } else {
                    console.error("Error while creating quiz live: ", response.status)
                    showErrorToast('Error while making quiz live')
                }
            }

        } catch (error) {
            console.error('Error creating live quiz:', error);
        } finally {
            setLoading(false)
        }
    };

    const encryptData = (data) => {
        try {
            return CryptoJS.AES.encrypt(data, 'weirnf#$%$erfbn9[-2-2-verc0-2@').toString();
        } catch (error) {
            console.error('Error encrypting data:', error);
            throw error; // Rethrow the error to propagate it further if needed
        }
    };

    return (
        <DashBoard>
            <div className="min-h-screen flex justify-center items-center">
                {
                    showQR ? (
                        <div className='flex flex-col'>
                            <div className="flex justify-center items-center p-10 blur-[2px]">
                                <QRCodeSVG
                                    value={JSON.stringify(quizCredentails)}
                                    size={300}
                                    bgColor='black'
                                    fgColor='white'
                                    level={"L"}
                                    includeMargin={false}
                                />
                            </div>
                            {
                                loading ? (
                                    <button
                                        className="btn btn-outline-secondary"
                                        type='submit'
                                    >
                                        loading ...
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline-secondary"
                                        type='submit'
                                        onClick={handleEndQuiz}
                                    >
                                        End Quiz
                                    </button>
                                )
                            }
                        </div>
                    ) : (
                        <div className="p-8 rounded-lg shadow-2xl w-11/12 md:w-3/4">
                            <form onSubmit={handleSubmit} className='text-center space-y-6'>
                                <input
                                    className="input-ghost-secondary input max-w-full text-primary"
                                    placeholder="Quiz ID"
                                    value={quizId}
                                    onChange={(value) => { setQuizId(value.target.value) }}
                                    required
                                />

                                {
                                    loading ? (
                                        <button
                                            className="btn btn-outline-secondary"
                                        >
                                            Loading ...
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-secondary"
                                            type='submit'
                                            onClick={handleSubmit}
                                        >
                                            Create Live Quiz
                                        </button>

                                    )
                                }

                            </form>
                        </div>
                    )
                }

            </div>
        </DashBoard>
    )
}

export default LiveQuizes
