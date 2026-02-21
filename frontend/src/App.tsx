import { useState } from 'react';
import { Portfolio } from './components/Portfolio';
import { ChatBot } from './components/ChatBot';
import './styles/app.css';

function App() {
  const [activeView, setActiveView] = useState<'both' | 'portfolio' | 'chat'>('both');

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo">🚀</div>
          <div>
            <h1>Anish Nath <span className="header-subtitle">— Portfolio</span></h1>
          </div>
        </div>
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeView === 'both' ? 'active' : ''}`}
            onClick={() => setActiveView('both')}
          >
            ⚡ Main 
          </button>
          <button
            className={`nav-tab ${activeView === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveView('portfolio')}
          >
            👤 Portfolio
          </button>
          <button
            className={`nav-tab ${activeView === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveView('chat')}
          >
            💬 Chat
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeView === 'both' && (
          <div className="split-layout">
            <Portfolio />
            <ChatBot />
          </div>
        )}
        {activeView === 'portfolio' && <Portfolio />}
        {activeView === 'chat' && <ChatBot />}
      </main>

      <footer className="app-footer">
        © 2026 <span>Anish Nath</span>. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
