import httpx
from config import OPENROUTER_API_KEY, OPENROUTER_API_URL, PORTFOLIO_DATA

async def chat_with_openrouter(user_message: str, conversation_history: list) -> str:
    
    edu_lines = []
    for edu in PORTFOLIO_DATA['education']:
        line = f"- {edu.get('institution', '')} | {edu.get('degree', '')} | {edu.get('year', '')}"
        if edu.get('cgpa'):
            line += f" | CGPA: {edu['cgpa']}"
        if edu.get('percentage_12'):
            line += f" | Class XII: {edu['percentage_12']}"
        if edu.get('percentage_10'):
            line += f" | Class X: {edu['percentage_10']}"
        edu_lines.append(line)

    proj_lines = []
    for p in PORTFOLIO_DATA['projects']:
        proj_lines.append(
            f"- {p['name']}: {p['description']} (Tech: {', '.join(p['technologies'])})"
        )

    system_prompt = f"""You are a helpful AI assistant for {PORTFOLIO_DATA['name']}'s portfolio. Answer questions accurately using only the information below.

NAME: {PORTFOLIO_DATA['name']}
TITLE: {PORTFOLIO_DATA['title']}
LOCATION: {PORTFOLIO_DATA['location']}
EMAIL: {PORTFOLIO_DATA['email']}
BIO: {PORTFOLIO_DATA['bio']}

SKILLS: {', '.join(PORTFOLIO_DATA['skills'])}

EXPERIENCE:
{chr(10).join(f"- {e['position']} at {e['company']} ({e['duration']}): {e['description']}" for e in PORTFOLIO_DATA['experience'])}

PROJECTS:
{chr(10).join(proj_lines)}

EDUCATION:
{chr(10).join(edu_lines)}

GITHUB: {PORTFOLIO_DATA['github']}

Rules: Be concise and professional. Only use the data above. If something is not listed, say you don't have that information."""

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
                    "max_tokens": 600
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
