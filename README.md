# Portfolio AI Chatbot

An interactive portfolio website with AI-powered chat functionality using OpenRouter API.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: FastAPI + Python
- **Database**: MongoDB
- **AI Engine**: OpenRouter (Google Gemini 2.0 Flash Lite)
- **Deployment**: Cloudflare Tunnel

## Features

✨ **Portfolio Section**
- About section
- Skills showcase
- Experience timeline
- Projects portfolio
- Education details

🤖 **AI Chat Assistant**
- Interactive chatbot powered by Gemini 2.0
- Real-time conversation with AI
- Chat history persistence with MongoDB
- Session management

## Prerequisites

- Node.js 18+ & npm
- Python 3.10+
- MongoDB (local or Atlas)
- OpenRouter API Key

## Setup

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate venv
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Add your OPENROUTER_API_KEY and MONGODB_URL
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
# Add REACT_APP_API_URL if backend is not on localhost:8000
```

## Running Locally

### Start MongoDB
```bash
# If using MongoDB locally
mongod

# Or use MongoDB Atlas by updating MONGODB_URL in .env
```

### Start Backend
```bash
cd backend
.venv\Scripts\python.exe main.py
# Backend runs on http://localhost:8000
```

### Start Frontend
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

## API Endpoints

- `GET /` - API health check
- `GET /api/portfolio` - Get portfolio data
- `POST /api/session/new` - Create new chat session
- `POST /api/chat` - Send message to AI
- `GET /api/chat/history/{session_id}` - Get chat history

## Deployment with Cloudflare Tunnel

### 1. Install Cloudflare Tunnel

```bash
# Download from https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/install-and-setup/

# Or use package manager (macOS):
brew install cloudflared
```

### 2. Authenticate

```bash
cloudflared tunnel login
```

### 3. Create Tunnel

```bash
cloudflared tunnel create portfolio-ai
```

### 4. Configure Tunnel (create `~/.cloudflared/config.yml`)

```yaml
tunnel: portfolio-ai
credentials-file: /path/to/.cloudflared/portfolio-ai.json

ingress:
  - hostname: yourdomain.com
    service: http://localhost:3000
  - hostname: api.yourdomain.com
    service: http://localhost:8000
  - service: http_status:404
```

### 5. Run Tunnel

```bash
cloudflared tunnel run portfolio-ai
```

## Environment Variables

### Backend (.env)
```
OPENROUTER_API_KEY=your_key_here
MONGODB_URL=mongodb://localhost:27017
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:8000/api
```

## Project Structure

```
backend/
├── main.py           # FastAPI app
├── db.py            # MongoDB connection
├── models.py        # Pydantic models
├── schemas.py       # API schemas
├── chat_handler.py  # OpenRouter integration
├── config.py        # Configuration
└── requirements.txt # Python dependencies

frontend/
├── src/
│   ├── components/
│   │   ├── Portfolio.tsx  # Portfolio component
│   │   └── ChatBot.tsx    # Chat component
│   ├── styles/            # CSS files
│   ├── api.ts            # API client
│   ├── App.tsx           # Main app
│   └── main.tsx          # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Future Enhancements

- [ ] Add authentication (Login/Sign up)
- [ ] Implement user profiles
- [ ] Add email notifications
- [ ] Deploy to production server
- [ ] Add more AI models
- [ ] Implement rate limiting
- [ ] Add analytics

## License

MIT

## Author

Your Name

---

**Submission Link**: [Form Link](https://forms.gle/7AkdJbKDtj4chqqWA)
**Deadline**: 24 February 2026
