import { useState, useEffect } from 'react';
import apiEndpoints from '../../services/api'

import DashBoard from '../../components/frames/Dashboard';
import QuizDetailCard from '../../components/card/quiz-details';

const QuizEntry = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchQuizzes();

        // eslint-disable-next-line
    }, []);

    const fetchQuizzes = async () => {
        try {
            setLoading(true)
            const userToken = localStorage.getItem('authToken');

            const response = await apiEndpoints.getMyQuizzes(userToken);

            setQuizzes(response.data.quizzes);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching quizzes:', error);
            setLoading(false)
        }
    };

    return (
        <DashBoard>
            {loading ? (
                <>loading ...</>
            ) : (
                quizzes?.length === 0 ? (
                    <h1 className="my-auto text-center">
                        Something went wrong <br />
                        Try again later !!!
                    </h1>
                ) : (
                    quizzes?.slice().map((data, index) => {
                        const quizDate = new Date(data.datecreated);
                        const formattedDate = quizDate.toLocaleDateString();
                        const formattedTime = quizDate.toLocaleTimeString();

                        return (
                            <QuizDetailCard
                                key={index}
                                quizTitle={data.title}
                                quizId={data.quizid}
                                date={formattedDate}
                                time={formattedTime}
                            />
                        );
                    })
                )
            )}

        </DashBoard>
    )
}

export default QuizEntry
