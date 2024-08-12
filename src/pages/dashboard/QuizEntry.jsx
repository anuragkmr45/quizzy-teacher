import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as CryptoJS from 'crypto-js'
import apiEndpoints from '../../services/api';

import { showSuccessToast } from '../../components/tosters/notifications';
import debounce from 'debounce';

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

        const handleCheckLiveQuiz = () => {
            const quizCredentails = localStorage.getItem('quizCredentails');

            if (quizCredentails) {
                setQuizCredentails(quizCredentails)
                setShowQR(true);
            }
        }

        handleCheckLiveQuiz();

        // eslint-disable-next-line
    }, [])

    const handleEncryptData = (plainText) => {
        const key = process.env.REACT_APP_ENCRYPTION_KEY
        const cipherText = CryptoJS.AES.encrypt(plainText, key).toString()
        return cipherText
    }

    const handleGenerateQR = debounce(async () => {
        const res = await apiEndpoints.createLiveQuiz({ quizId });

        const qrExpire = new Date().getTime() + 3010;
        const quizID = handleEncryptData(res.data.quizID);
        const quizPass = handleEncryptData(res.data.RoomPassword);

        const quizRoomCredentials = JSON.stringify({
            expireDate: qrExpire,
            id: quizID,
            pass: quizPass,
        });

        localStorage.setItem('quizCredentails', quizRoomCredentials)

        setQuizCredentails(quizRoomCredentials)

        // eslint-disable-next-line
    }, 1000);

    const handleEndQuiz = async () => {
        setLoading(true)
        try {
            const res = await apiEndpoints.endQuiz(quizId)

            if (res.data.success) {
                setShowQR(false)
                localStorage.removeItem('quizCredentails')

                showSuccessToast('Quiz Ended Successfully')

                navigate('/dashboard/previous-quizes');
            }
        } catch (error) {
            console.error('Error while ending quiz: ', error)
        } finally {
            setLoading(false)
        }

    };

    return (
        <section className="min-h-screen flex justify-center items-center">
            <div className='flex flex-col'>
                <div className="flex justify-center items-center p-10">
                    {
                        showQR ? (
                            <QRCodeSVG
                                value={quizCredentails}
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
