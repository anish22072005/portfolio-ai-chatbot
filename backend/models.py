from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from bson import ObjectId

class ChatMessage(BaseModel):
    """MongoDB chat message model"""
    id: Optional[str] = Field(None, alias="_id")
    session_id: str
    user_message: str
    assistant_message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda v: v.isoformat()
        }
