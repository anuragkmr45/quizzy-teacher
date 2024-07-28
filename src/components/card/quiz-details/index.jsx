import { useState, memo, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Clipboard from 'clipboard';
import apiEndpoints from '../../../services/api';
import { showSuccessToast, showErrorToast } from '../../tosters/notifications';
import QuizDtlModal from '../../modal/QuizDtlModal';

const QuizDetailCard = ({ quizTitle, quizId, date }) => {

    const [quizQuestions, setQuizQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchQuizDtls = useCallback(async () => {
        setLoading(true)
        try {
            const res = await apiEndpoints.getQuizDetails(quizId)

            if (res.data.success === true) {
                setQuizQuestions(res.data.quizDetails)
            }
        } catch (error) {
            console.error(`Error while fetching ${quizId} details: `, error)
        } finally {
            setLoading(false)
        }
    }, [quizId]);

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const copyQuizIdToClipboard = useMemo(() => {
        // Create a new clipboard instance
        const clipboard = new Clipboard('.copy-button', {
            text: () => quizId
        });

        clipboard.on('success', () => {
            clipboard.destroy(); // Clean up the clipboard instance
            showSuccessToast('Quiz ID copied to clipboard');
        });

        clipboard.on('error', () => {
            clipboard.destroy(); // Clean up the clipboard instance
            showErrorToast('Failed to copy Quiz ID to clipboard');
        });

        // Manually trigger the click event on the invisible copy button
        document.querySelector('.copy-button').click();
    }, [quizId]);

    return (
        <div className="card my-5 mx-auto w-11/12 md:max-w-full ">
            <div className="card-body max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className='col-span-2 space-y-4' >
                        <h2 className="text-xl">{quizTitle}</h2>
                        <label className="btn btn-outline-secondary" onClick={fetchQuizDtls} htmlFor={`quiz-dtl-${quizTitle}`}>More Details ... </label>
                    </div>
                    <div className="col-span-1 space-y-4 copy-button" onClick={copyQuizIdToClipboard}>
                        <div>
                            <b>Quiz ID: </b>
                            <Link className='text-black text-xs bg-white rounded-md px-2 py-1 cursor-pointer' to='/dashboard/make-quiz-live' state={{ quizId: quizId }}>
                                Make Quiz Live
                            </Link>
                        </div>
                        <small>
                            <b>Created At: </b> {formattedDate} <br />
                        </small>
                    </div>
                </div>
            </div>

            <QuizDtlModal
                quizTitle={quizTitle}
                loading={loading}
                quizQuestions={quizQuestions}
            />
        </div>
    );
};

export default memo(QuizDetailCard);
