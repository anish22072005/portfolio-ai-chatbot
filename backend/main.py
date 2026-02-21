from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import uuid

from db import init_db_connection, close_db_connection, get_db
from schemas import ChatRequestSchema, ChatResponseSchema
from chat_handler import chat_with_openrouter
from config import PORTFOLIO_DATA

app = FastAPI(title="Portfolio AI Chatbot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://portfolio-ai-chatbot.netlify.app",
        "https://cool-snickerdoodle-2bb35b.netlify.app",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await init_db_connection()
    print("Portfolio AI Chatbot API started")

@app.on_event("shutdown")
async def shutdown():
    await close_db_connection()

@app.get("/")
async def root():
    return {"message": "Portfolio AI Chatbot API", "status": "running"}

@app.get("/api/portfolio")
async def get_portfolio():
    return PORTFOLIO_DATA

@app.post("/api/chat", response_model=ChatResponseSchema)
async def chat(request: ChatRequestSchema):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    db = await get_db()

    conversation = []
    if db is not None:
        try:
            history = await db.chat_messages.find(
                {"session_id": request.session_id}
            ).sort("timestamp", 1).to_list(None)
            for msg in history:
                conversation.append({"role": "user", "content": msg["user_message"]})
                conversation.append({"role": "assistant", "content": msg["assistant_message"]})
        except Exception:
            pass

    assistant_response = await chat_with_openrouter(request.message, conversation)
    
    now = datetime.utcnow()

    if db is not None:
        try:
            chat_message = {
                "session_id": request.session_id,
                "user_message": request.message,
                "assistant_message": assistant_response,
                "timestamp": now
            }
            await db.chat_messages.insert_one(chat_message)
        except Exception:
            pass
    
    return ChatResponseSchema(
        user_message=request.message,
        assistant_message=assistant_response,
        timestamp=now
    )

@app.get("/api/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    db = await get_db()
    
    messages = await db.chat_messages.find(
        {"session_id": session_id}
    ).sort("timestamp", -1).to_list(None)
    
    return {
        "session_id": session_id,
        "messages": [
            {
                "user_message": msg["user_message"],
                "assistant_message": msg["assistant_message"],
                "timestamp": msg["timestamp"].isoformat() if isinstance(msg["timestamp"], datetime) else msg["timestamp"]
            }
            for msg in messages
        ]
    }

@app.post("/api/session/new")
async def create_new_session():
    session_id = str(uuid.uuid4())
    return {"session_id": session_id}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
