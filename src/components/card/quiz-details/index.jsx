import React, { useState } from 'react';
import Clipboard from 'clipboard';
import apiEndpoints from '../../../services/api';
import { showSuccessToast, showErrorToast } from '../../tosters/notifications';
import QuestionCard from '../question-card'

const QuizDetailCard = ({ quizTitle, quizId, date, time }) => {

    const [quizQuestions, setQuizQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchQuizDtls = async () => {
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
    }

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const copyQuizIdToClipboard = () => {
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
    };
    console.log('quizQuestions: ', quizQuestions)
    return (
        <div className="card my-5 mx-auto w-11/12 md:max-w-full ">
            <div className="card-body max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className='col-span-2 space-y-4' >
                        <h2 className="text-xl">{quizTitle}</h2>
                        <label className="btn btn-outline-secondary" onClick={fetchQuizDtls} htmlFor="quiz-dtl">More Details ... </label>
                    </div>
                    <div className="col-span-1 copy-button" onClick={copyQuizIdToClipboard}>
                        <p>
                            <b>Quiz ID: </b>
                            <span className='text-black text-xs bg-white rounded-md px-2 py-1 cursor-pointer'>
                                Click To Copy QuizID
                            </span>
                        </p>
                        <small>
                            <b>Created At: </b> {formattedDate} <br />
                        </small>
                    </div>
                </div>
            </div>

            <input className="modal-state" id="quiz-dtl" type="checkbox" />
            <div className="modal w-screen">
                <label className="modal-overlay" htmlFor="quiz-dtl"></label>
                <div className="modal-content flex flex-col gap-5 max-w-3xl">
                    <label htmlFor="quiz-dtl" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>

                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <h2 className="text-xl">Quiz Title: {quizTitle}</h2>
                            <span className='text-sm'>
                                <b>Quiz Subject: </b>{quizQuestions.TopicName}
                            </span>
                            <span className='text-sm'>
                                <b>Quiz Description: </b>{quizQuestions.Description}
                            </span>
                            {quizQuestions.Questions?.map((data, index) => (
                                <QuestionCard
                                    key={index}
                                    index={index}
                                    question={data.Question}
                                    option1={data.Options[0]}
                                    option2={data.Options[1]}
                                    option3={data.Options[2]}
                                    option4={data.Options[3]}
                                    answer={data.Answer}
                                />
                            ))}
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default QuizDetailCard;
