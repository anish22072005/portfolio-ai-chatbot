import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface PortfolioData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  github: string;
  skills: string[];
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    type: 'college' | 'school';
    cgpa?: string;
    percentage_12?: string;
    percentage_10?: string;
  }>;
}

export interface ChatMessage {
  user_message: string;
  assistant_message: string;
  timestamp: string;
}

export const portfolioAPI = {
  getPortfolio: async (): Promise<PortfolioData> => {
    const response = await apiClient.get('/portfolio');
    return response.data;
  },

  createSession: async (): Promise<{ session_id: string }> => {
    const response = await apiClient.post('/session/new');
    return response.data;
  },

  sendMessage: async (sessionId: string, message: string): Promise<ChatMessage> => {
    const response = await apiClient.post('/chat', {
      session_id: sessionId,
      message,
    });
    return response.data;
  },

  getChatHistory: async (sessionId: string): Promise<{ session_id: string; messages: ChatMessage[] }> => {
    const response = await apiClient.get(`/chat/history/${sessionId}`);
    return response.data;
  },
};
