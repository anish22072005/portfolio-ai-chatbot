import React, { useState } from 'react';
import { portfolioData } from '../portfolioData';
import '../styles/portfolio.css';

export const Portfolio: React.FC = () => {
  const portfolio = portfolioData;
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'experience' | 'projects' | 'education'>('about');
  const initials = portfolio.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <div className="portfolio-avatar">{initials}</div>
        <h1>{portfolio.name}</h1>
        <p className="title">{portfolio.title}</p>
        <p className="location">📍 {portfolio.location}</p>
        <div className="contact-info">
          <a href={`mailto:${portfolio.email}`}>📧 {portfolio.email}</a>
          <span>📞 {portfolio.phone}</span>
          <a href={portfolio.github} target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
        </div>
      </div>

      <div className="portfolio-tabs">
        <button className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>👤 About</button>
        <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>⚡ Skills</button>
        <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>💼 Experience</button>
        <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>🚀 Projects</button>
        <button className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} onClick={() => setActiveTab('education')}>🎓 Education</button>
      </div>

      <div className="portfolio-content">
        {activeTab === 'about' && (
          <div className="tab-content">
            <h2>👤 About</h2>
            <p>{portfolio.bio}</p>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="tab-content">
            <h2>⚡ Skills</h2>
            <div className="skills-grid">
              {portfolio.skills.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="tab-content">
            <h2>💼 Experience</h2>
            {portfolio.experience.map((exp, idx) => (
              <div key={idx} className="experience-card">
                <h3>{exp.position}</h3>
                <p className="company">🏢 {exp.company}</p>
                <p className="duration">🗓 {exp.duration}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="tab-content">
            <h2>🚀 Projects</h2>
            {portfolio.projects.map((project, idx) => (
              <div key={idx} className="project-card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <a href={project.url ?? portfolio.github} target="_blank" rel="noopener noreferrer" className="project-link">
                  View on GitHub →
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="tab-content">
            <h2>🎓 Education</h2>
            {portfolio.education.map((edu, idx) => (
              <div key={idx} className="education-card">
                <div className="edu-type-badge">{edu.type === 'college' ? '🏛 College' : '🏫 School'}</div>
                <h3>{edu.degree}</h3>
                <p className="school">📍 {edu.institution}</p>
                <p className="year">🗓 {edu.year}</p>
                {edu.cgpa && (
                  <p className="edu-detail">🎯 CGPA: <strong>{edu.cgpa}</strong></p>
                )}
                {edu.percentage_12 && (
                  <p className="edu-detail">📊 Class XII: <strong>{edu.percentage_12}</strong></p>
                )}
                {edu.percentage_10 && (
                  <p className="edu-detail">📊 Class X: <strong>{edu.percentage_10}</strong></p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
