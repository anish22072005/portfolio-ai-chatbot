from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo import ASCENDING
from config import MONGODB_URL

# MongoDB client and database
client: AsyncIOMotorClient = None
db: AsyncIOMotorDatabase = None

async def init_db_connection():
    """Initialize MongoDB connection"""
    global client, db
    client = AsyncIOMotorClient(MONGODB_URL or "mongodb://localhost:27017")
    db = client.portfolio_ai
    
    # Create indexes
    try:
        await db.chat_messages.create_index(
            [("session_id", ASCENDING), ("timestamp", ASCENDING)]
        )
        print("MongoDB connected and indexes created")
    except Exception as e:
        print(f"Warning: MongoDB index creation failed: {e}")
        print("Server will still run, but chat history may not be available")

async def close_db_connection():
    """Close MongoDB connection"""
    global client
    if client:
        client.close()
        print("MongoDB disconnected")

async def get_db():
    """Get database instance"""
    return db
