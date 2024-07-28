import axios from 'axios';

const baseURL = 'https://quizzyredis-production.up.railway.app/'
// const baseURL = 'https://panicky-fish-hose.cyclic.app/'

const api = axios.create({
    baseURL: baseURL,
    // timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const setAuthToken = (token, includeBearer = true) => {

    if (token) {
        if (includeBearer) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            api.defaults.headers.common['Authorization'] = token;
        }
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

const apiEndpoints = {
    login: ({ email, password }) => api.post('/teacher-login', { email, password }),
    register: ({ name, email, password }) => api.post('/teacher-register', { name, email, password }),
    logout: () => {
        const token = localStorage.getItem('authToken');
        setAuthToken(token, false);
        return api.post('/');
    },
    createQuiz: ({ Title, Description, DateCreated, SubjectID, TopicName, Questions }) => {
        const token = localStorage.getItem('authToken');
        setAuthToken(token, false);
        return api.post('/dashboard/add-quiz', { Title, Description, DateCreated, SubjectID, TopicName, Questions });
    },
    createLiveQuiz: ({ quizId }) => {
        const token = localStorage.getItem('authToken');
        setAuthToken(token, false);
        return api.post('/dashboard/make-quiz-live', { quizId });
    },
    getMyQuizzes: () => {
        const token = localStorage.getItem('authToken');
        setAuthToken(token, false);
        return api.get('/dashboard/previous-quizes');
    },
    getQuiz: (quizId) => {
        const token = localStorage.getItem('authToken');
        setAuthToken(token, false);
        return api.get(`/teachers/dashboard/previous-quizes/${quizId}`);
    },
    getQuizDetails: (quizId) => {
        const token = localStorage.getItem('authToken');
        setAuthToken(token, true);
        return api.get(`/dashboard/quiz-preview/${quizId}`);
    },
    getQuizResults: (token, quizId) => {
        setAuthToken(token);
        return api.get(`/dashboard/my-quizzes/${quizId}/results`);
    },
    endQuiz: (quizId) => {
        const token = localStorage.getItem('authToken');
        setAuthToken(token, true)
        return api.get(`/dashboard/make-quiz-live/${quizId}/end-quiz`)
    }
};

export default apiEndpoints;