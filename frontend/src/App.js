import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Portfolio } from './components/Portfolio';
import { ChatBot } from './components/ChatBot';
import './styles/app.css';
function App() {
    const [activeView, setActiveView] = useState('both');
    return (_jsxs("div", { className: "app-container", children: [_jsxs("header", { className: "app-header", children: [_jsxs("div", { className: "header-brand", children: [_jsx("div", { className: "header-logo", children: "\uD83D\uDE80" }), _jsx("div", { children: _jsxs("h1", { children: ["Anish Nath ", _jsx("span", { className: "header-subtitle", children: "\u2014 Portfolio" })] }) })] }), _jsxs("nav", { className: "nav-tabs", children: [_jsx("button", { className: `nav-tab ${activeView === 'both' ? 'active' : ''}`, onClick: () => setActiveView('both'), children: "\u26A1 Main" }), _jsx("button", { className: `nav-tab ${activeView === 'portfolio' ? 'active' : ''}`, onClick: () => setActiveView('portfolio'), children: "\uD83D\uDC64 Portfolio" }), _jsx("button", { className: `nav-tab ${activeView === 'chat' ? 'active' : ''}`, onClick: () => setActiveView('chat'), children: "\uD83D\uDCAC Chat" })] })] }), _jsxs("main", { className: "app-main", children: [activeView === 'both' && (_jsxs("div", { className: "split-layout", children: [_jsx(Portfolio, {}), _jsx(ChatBot, {})] })), activeView === 'portfolio' && _jsx(Portfolio, {}), activeView === 'chat' && _jsx(ChatBot, {})] }), _jsxs("footer", { className: "app-footer", children: ["\u00A9 2026 ", _jsx("span", { children: "Anish Nath" }), ". All rights reserved."] })] }));
}
export default App;
