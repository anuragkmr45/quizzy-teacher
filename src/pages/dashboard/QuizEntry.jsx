import { useState, useEffect, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import CryptoJS from 'crypto-js';
import { useLocation, useNavigate } from 'react-router-dom';
import apiEndpoints from '../../services/api';

import { showSuccessToast } from '../../components/tosters/notifications';

const LiveQuizes = () => {
    const [quizCredentails, setQuizCredentails] = useState();
    const [loading, setLoading] = useState(false)
    const [showQR, setShowQR] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();
    const { quizId } = location.state;

    useEffect(() => {
        let intervalId;
        if (showQR) {
            intervalId = setInterval(() => {
                handleGenerateQR();
            }, 3000);
        }

        return () => {
            clearInterval(intervalId);
        };

        // eslint-disable-next-line
    }, [showQR]);

    useEffect(() => {
        if (quizId !== '') {
            setTimeout(() => {
                handleGenerateQR();
                setShowQR(true);
            }, [1000])
        }
        // eslint-disable-next-line
    }, [])

    const encryptData = (data) => {
        try {
            return CryptoJS.AES.encrypt(data, 'weirnf#$%$erfbn9[-2-2-verc0-2@').toString();
        } catch (error) {
            console.error('Error encrypting data:', error);
            throw error; // Rethrow the error to propagate it further if needed
        }
    };

    const handleGenerateQR = useCallback(async () => {
        const res = await apiEndpoints.createLiveQuiz({ quizId });

        const qrExpire = new Date().getTime() + 3010;
        const quizID = encryptData(res.data.quizID);
        const quizPass = encryptData(res.data.RoomPassword);

        const quizRoomCredentials = {
            expireDate: qrExpire,
            id: quizID,
            pass: quizPass,
        }

        localStorage.setItem('quizCredentails', JSON.stringify(quizRoomCredentials))

        setQuizCredentails(quizRoomCredentials)

        // eslint-disable-next-line
    }, [quizId]);

    const handleEndQuiz = useCallback(async () => {
        setLoading(true)
        try {
            const res = await apiEndpoints.endQuiz(quizId)

            if (res.data.success) {
                setShowQR(false)
                localStorage.removeItem('quizCredentails')
                localStorage.clear()

                showSuccessToast('Quiz Ended Successfully')

                navigate('/dashboard/previous-quizes');
            }
        } catch (error) {
            console.error('Error while ending quiz: ', error)
        } finally {
            setLoading(false)
        }

    }, [quizId, navigate]);

    return (
        <section className="min-h-screen flex justify-center items-center">
            <div className='flex flex-col'>
                <div className="flex justify-center items-center p-10">
                    {
                        showQR ? (
                            <QRCodeSVG
                                value={JSON.stringify(quizCredentails)}
                                size={300}
                                bgColor='black'
                                fgColor='white'
                                level={"L"}
                                includeMargin={false}
                            />
                        ) : (
                            <h1>loading</h1>
                        )
                    }
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
        </section>
    )
}

export default LiveQuizes
