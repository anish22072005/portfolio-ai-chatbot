import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { portfolioAPI } from '../api';
import '../styles/portfolio.css';
export const Portfolio = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('about');
    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const data = await portfolioAPI.getPortfolio();
                setPortfolio(data);
            }
            catch (error) {
                console.error('Failed to fetch portfolio:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, []);
    if (loading) {
        return _jsx("div", { className: "portfolio-loading", children: "Loading portfolio..." });
    }
    if (!portfolio) {
        return _jsx("div", { className: "portfolio-error", children: "Failed to load portfolio" });
    }
    return (_jsxs("div", { className: "portfolio-container", children: [_jsxs("div", { className: "portfolio-header", children: [_jsx("div", { className: "portfolio-avatar", children: "AN" }), _jsx("h1", { children: portfolio.name }), _jsx("p", { className: "title", children: portfolio.title }), _jsxs("p", { className: "location", children: ["\uD83D\uDCCD ", portfolio.location] }), _jsxs("div", { className: "contact-info", children: [_jsxs("a", { href: `mailto:${portfolio.email}`, children: ["\uD83D\uDCE7 ", portfolio.email] }), _jsxs("span", { children: ["\uD83D\uDCDE ", portfolio.phone] }), _jsx("a", { href: portfolio.github, target: "_blank", rel: "noopener noreferrer", children: "\uD83D\uDC19 GitHub" })] })] }), _jsxs("div", { className: "portfolio-tabs", children: [_jsx("button", { className: `tab-btn ${activeTab === 'about' ? 'active' : ''}`, onClick: () => setActiveTab('about'), children: "\uD83D\uDC64 About" }), _jsx("button", { className: `tab-btn ${activeTab === 'skills' ? 'active' : ''}`, onClick: () => setActiveTab('skills'), children: "\u26A1 Skills" }), _jsx("button", { className: `tab-btn ${activeTab === 'experience' ? 'active' : ''}`, onClick: () => setActiveTab('experience'), children: "\uD83D\uDCBC Experience" }), _jsx("button", { className: `tab-btn ${activeTab === 'projects' ? 'active' : ''}`, onClick: () => setActiveTab('projects'), children: "\uD83D\uDE80 Projects" }), _jsx("button", { className: `tab-btn ${activeTab === 'education' ? 'active' : ''}`, onClick: () => setActiveTab('education'), children: "\uD83C\uDF93 Education" })] }), _jsxs("div", { className: "portfolio-content", children: [activeTab === 'about' && (_jsxs("div", { className: "tab-content", children: [_jsx("h2", { children: "\uD83D\uDC64 About" }), _jsx("p", { children: portfolio.bio })] })), activeTab === 'skills' && (_jsxs("div", { className: "tab-content", children: [_jsx("h2", { children: "\u26A1 Skills" }), _jsx("div", { className: "skills-grid", children: portfolio.skills.map((skill) => (_jsx("span", { className: "skill-tag", children: skill }, skill))) })] })), activeTab === 'experience' && (_jsxs("div", { className: "tab-content", children: [_jsx("h2", { children: "\uD83D\uDCBC Experience" }), portfolio.experience.map((exp, idx) => (_jsxs("div", { className: "experience-card", children: [_jsx("h3", { children: exp.position }), _jsxs("p", { className: "company", children: ["\uD83C\uDFE2 ", exp.company] }), _jsxs("p", { className: "duration", children: ["\uD83D\uDDD3 ", exp.duration] }), _jsx("p", { children: exp.description })] }, idx)))] })), activeTab === 'projects' && (_jsxs("div", { className: "tab-content", children: [_jsx("h2", { children: "\uD83D\uDE80 Projects" }), portfolio.projects.map((project, idx) => (_jsxs("div", { className: "project-card", children: [_jsx("h3", { children: project.name }), _jsx("p", { children: project.description }), _jsx("div", { className: "tech-stack", children: project.technologies.map((tech) => (_jsx("span", { className: "tech-badge", children: tech }, tech))) }), _jsx("a", { href: portfolio.github, target: "_blank", rel: "noopener noreferrer", className: "project-link", children: "View on GitHub \u2192" })] }, idx)))] })), activeTab === 'education' && (_jsxs("div", { className: "tab-content", children: [_jsx("h2", { children: "\uD83C\uDF93 Education" }), portfolio.education.map((edu, idx) => (_jsxs("div", { className: "education-card", children: [_jsx("div", { className: "edu-type-badge", children: edu.type === 'college' ? '🏛 College' : '🏫 School' }), _jsx("h3", { children: edu.degree }), _jsxs("p", { className: "school", children: ["\uD83D\uDCCD ", edu.institution] }), _jsxs("p", { className: "year", children: ["\uD83D\uDDD3 ", edu.year] }), edu.cgpa && (_jsxs("p", { className: "edu-detail", children: ["\uD83C\uDFAF CGPA: ", _jsx("strong", { children: edu.cgpa })] })), edu.percentage_12 && (_jsxs("p", { className: "edu-detail", children: ["\uD83D\uDCCA Class XII: ", _jsx("strong", { children: edu.percentage_12 })] })), edu.percentage_10 && (_jsxs("p", { className: "edu-detail", children: ["\uD83D\uDCCA Class X: ", _jsx("strong", { children: edu.percentage_10 })] }))] }, idx)))] }))] })] }));
};
