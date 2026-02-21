from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ChatMessageSchema(BaseModel):
    session_id: str
    user_message: str
    assistant_message: Optional[str] = None
    timestamp: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class ChatRequestSchema(BaseModel):
    session_id: str
    message: str

class ChatResponseSchema(BaseModel):
    user_message: str
    assistant_message: str
    timestamp: datetime
