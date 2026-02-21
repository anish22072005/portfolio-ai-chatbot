import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const portfolioAPI = {
    getPortfolio: async () => {
        const response = await apiClient.get('/portfolio');
        return response.data;
    },
    createSession: async () => {
        const response = await apiClient.post('/session/new');
        return response.data;
    },
    sendMessage: async (sessionId, message) => {
        const response = await apiClient.post('/chat', {
            session_id: sessionId,
            message,
        });
        return response.data;
    },
    getChatHistory: async (sessionId) => {
        const response = await apiClient.get(`/chat/history/${sessionId}`);
        return response.data;
    },
};
