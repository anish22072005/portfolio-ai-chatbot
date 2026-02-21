import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { portfolioAPI } from '../api';
import { v4 as uuidv4 } from 'uuid';
import '../styles/chatbot.css';
export const ChatBot = () => {
    const [messages, setMessages] = useState([
        {
            id: '1',
            type: 'assistant',
            content: 'Hello! I am an AI assistant powered by your portfolio. Ask me anything about the portfolio owner\'s skills, experience, projects, or education.',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        const initSession = async () => {
            try {
                const session = await portfolioAPI.createSession();
                setSessionId(session.session_id);
            }
            catch (error) {
                console.error('Failed to create session:', error);
            }
        };
        initSession();
    }, []);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || !sessionId || loading)
            return;
        const userMessage = {
            id: uuidv4(),
            type: 'user',
            content: input,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        try {
            const response = await portfolioAPI.sendMessage(sessionId, input);
            const assistantMessage = {
                id: uuidv4(),
                type: 'assistant',
                content: response.assistant_message,
                timestamp: new Date(response.timestamp),
            };
            setMessages((prev) => [...prev, assistantMessage]);
        }
        catch (error) {
            console.error('Failed to send message:', error);
            const errorMessage = {
                id: uuidv4(),
                type: 'assistant',
                content: 'Sorry, I encountered an error while processing your message. Please try again.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        }
        finally {
            setLoading(false);
        }
    };
    const suggestions = [
        "What are his skills?",
        "Tell me about projects",
        "Work experience?",
        "Education background?",
    ];
    const handleSuggestion = (text) => {
        setInput(text);
    };
    return (_jsxs("div", { className: "chatbot-container", children: [_jsxs("div", { className: "chatbot-header", children: [_jsx("div", { className: "chatbot-header-icon", children: "\uD83E\uDD16" }), _jsxs("div", { className: "chatbot-header-text", children: [_jsx("h2", { children: "Portfolio AI Assistant" }), _jsx("p", { children: "Ask me anything about Anish" })] }), _jsx("div", { className: "online-dot" })] }), _jsxs("div", { className: "messages-container", children: [messages.map((message) => (_jsxs("div", { className: `message message-${message.type}`, children: [_jsx("div", { className: "message-avatar", children: message.type === 'user' ? '👤' : '🤖' }), _jsxs("div", { className: "message-content", children: [_jsx("p", { children: message.content }), _jsx("span", { className: "message-time", children: message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })] })] }, message.id))), loading && (_jsxs("div", { className: "message message-assistant", children: [_jsx("div", { className: "message-avatar", children: "\uD83E\uDD16" }), _jsx("div", { className: "message-content", children: _jsxs("div", { className: "typing-indicator", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }) })] })), _jsx("div", { ref: messagesEndRef })] }), messages.length <= 1 && (_jsx("div", { className: "suggestions", children: suggestions.map((s) => (_jsx("button", { className: "suggestion-btn", onClick: () => handleSuggestion(s), children: s }, s))) })), _jsxs("form", { onSubmit: handleSendMessage, className: "message-input-form", children: [_jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), placeholder: "Ask about skills, projects, experience...", disabled: loading, className: "message-input" }), _jsx("button", { type: "submit", disabled: loading || !input.trim(), className: "send-btn", children: loading ? '⏳' : '➤' })] })] }));
};
