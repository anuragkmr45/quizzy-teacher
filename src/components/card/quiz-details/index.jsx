import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import apiEndpoints from '../../../services/api';
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
            console.error(`Error while fetching quiz details: `, error)
        } finally {
            setLoading(false)
        }
    }, [quizId]);

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="card my-5 mx-auto w-11/12 md:max-w-full ">
            <div className="card-body max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className='col-span-2 space-y-4' >
                        <h2 className="text-xl">{quizTitle}</h2>
                        <label className="btn btn-outline-secondary" onClick={fetchQuizDtls} htmlFor={`quiz-dtl-${quizTitle}`}>More Details ... </label>
                    </div>
                    <div className="col-span-1 flex flex-col space-y-4 copy-button">
                        <Link className='text-black text-base bg-white w-fit rounded-md px-4 py-2 font-bold cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out' to='/dashboard/make-quiz-live' state={{ quizId: quizId }}>
                            Make Quiz Live
                        </Link>
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

export default QuizDetailCard;
