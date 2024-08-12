import { memo } from 'react';
import QuestionCard from '../card/question-card';

const QuizDtlModal = ({ quizTitle, loading, quizQuestions }) => {
    return (
        <>
            <input className="modal-state" id={`quiz-dtl-${quizTitle}`} type="checkbox" />
            <div className="modal w-screen">
                <label className="modal-overlay" htmlFor={`quiz-dtl-${quizTitle}`}></label>
                <div className="modal-content flex flex-col gap-5 max-w-3xl">
                    <label htmlFor={`quiz-dtl-${quizTitle}`} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>

                    {loading ? (
                        <h1>Loading..</h1>
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
        </>
    )
}

export default memo(QuizDtlModal);
