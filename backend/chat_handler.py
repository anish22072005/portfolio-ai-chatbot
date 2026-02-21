import httpx
import json
from config import OPENROUTER_API_KEY, OPENROUTER_API_URL, PORTFOLIO_DATA

async def chat_with_openrouter(user_message: str, conversation_history: list) -> str:
    
    system_prompt = f"""You are a helpful AI assistant representing a software developer's portfolio. 
    
Here is the portfolio owner's information:
- Name: {PORTFOLIO_DATA['name']}
- Title: {PORTFOLIO_DATA['title']}
- Bio: {PORTFOLIO_DATA['bio']}
- Skills: {', '.join(PORTFOLIO_DATA['skills'])}
- Email: {PORTFOLIO_DATA['email']}
- Location: {PORTFOLIO_DATA['location']}

Experience:
{json.dumps(PORTFOLIO_DATA['experience'], indent=2)}

Projects:
{json.dumps(PORTFOLIO_DATA['projects'], indent=2)}

Education:
{json.dumps(PORTFOLIO_DATA['education'], indent=2)}

Answer questions about the portfolio owner's skills, experience, and projects accurately. 
Be professional, helpful, and concise. If asked something not in the portfolio, say you don't have that information."""

    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(conversation_history)
    messages.append({"role": "user", "content": user_message})
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                OPENROUTER_API_URL,
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "Portfolio AI Chatbot"
                },
                json={
                    "model": "arcee-ai/trinity-mini:free",
                    "messages": messages,
                    "temperature": 0.7,
                    "max_tokens": 300
                },
                timeout=30.0
            )
            
            if response.status_code == 200:
                data = response.json()
                content = data["choices"][0]["message"]["content"]
                import re
                content = re.sub(r'<think>.*?</think>', '', content, flags=re.DOTALL).strip()
                return content
            else:
                return f"Error: {response.status_code} - {response.text}"
    except Exception as e:
        return f"Error connecting to AI service: {str(e)}"
