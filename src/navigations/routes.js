import Login from '../pages/auth/Signin';

import AddQuiz from '../pages/dashboard/AddQuizes';
import LiveQuiz from '../pages/dashboard/QuizEntry';
import MyQuizes from '../pages/dashboard/MyQuizes';
import QuestionBank from '../pages/dashboard/QuestionBank';

export const routes = [
    {
        element: <Login />,
        path: '/',
    },

]

export const dashboardRoutes = [
    {
        element: <AddQuiz />,
        path: '/dashboard/add-quiz',
    },
    {
        element: <LiveQuiz />,
        path: '/dashboard/make-quiz-live',
    },
    {
        element: <MyQuizes />,
        path: '/dashboard/previous-quizes',
    },
    {
        element: <QuestionBank />,
        path: '/dashboard/question-bank',
    },
]