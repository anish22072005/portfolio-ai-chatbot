import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")


PORTFOLIO_DATA = {
    "name": "Anish Nath",
    "title": "Full-Stack Developer",
    "email": "anishnath2005@gmail.com",
    "phone": "+91 8472090399",
    "location": "Chennai, India",
    "bio": "Hello Everyone! I'm Anish Nath, a passionate full-stack developer with a strong foundation in computer science. I have experience building web applications using technologies like React, TypeScript, FastAPI, and MongoDB. I enjoy solving complex problems and creating efficient solutions. I'm currently exploring AI and machine learning to enhance my development skills.\n\nBeyond tech, I hold a Guitar certificate from the London College of Music 🎸, a Brown Belt in Karate 🥋, and have represented my district as a competitive Lawn Tennis player 🎾. Feel free to ask me anything about my skills, experience, or projects!",
    "skills": [
        "Python", "JavaScript", "React", "TypeScript", "FastAPI", 
        "MongoDB", "Git", "REST APIs", "Web Development", "Machine Learning", "Java"
    ],
    "experience": [
        {
            "company": "Numaligarh Refinery Limited, Assam",
            "position": "IT Intern",
            "duration": "December 2025 - January 2026",
            "description": "Building Machine Learning models to predict the quality of crude oil using Python and Scikit-learn."
        }
    ],
    "github": "https://github.com/anish22072005",
    "projects": [
        {
            "name": "Portfolio AI Chatbot",
            "description": "Interactive portfolio with AI-powered chat",
            "technologies": ["React", "TypeScript", "FastAPI", "OpenRouter", "MongoDB"]
        },
        {
            "name": "Full Stack Task Manager",
            "description": "A full stack task management website to create, update, and track tasks with user authentication",
            "technologies": ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"]
        }
        
    ],
    "education": [
        {
            "institution": "SRM Institute of Science and Technology, Chennai",
            "degree": "Bachelor of Technology in Computer Science",
            "year": "2024 – 2028",
            "cgpa": "9.0 / 10",
            "type": "college"
        },
        {
            "institution": "Delhi Public School, Numaligarh, Assam",
            "degree": "Higher Secondary (Class XII) & Secondary (Class X)",
            "year": "2024",
            "percentage_12": "81.4%",
            "percentage_10": "91.4%",
            "type": "school"
        }
    ]
}
