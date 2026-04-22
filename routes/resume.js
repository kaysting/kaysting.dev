const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    const target = req.query.target || 'general';

    res.locals.target = target;

    res.locals.data = {
        title: 'Kayla Kersting',
        subtitle: 'Computer Science Graduate | Full-Stack Developer | System Administrator',
        chips: [
            { symbol: 'location_on', label: 'Seattle, WA' },
            {
                symbol: 'mail',
                link: 'mailto:kayla@kaysting.dev',
                label: 'kayla@kaysting.dev'
            },
            {
                symbol: 'language',
                link: 'https://kaysting.dev',
                label: 'kaysting.dev'
            },
            {
                symbol: 'code',
                link: 'https://github.com/kaysting',
                label: 'github.com/kaysting'
            }
        ],
        education: [
            {
                institution: 'University of Houston, College of Natural Sciences and Mathematics',
                degree: `Bachelors of Science in Computer Science, Minor in Psychology`,
                location: 'Houston, TX',
                start: 'August 2021',
                end: 'December 2025'
            }
        ]
    };

    const jobTHP = {
        title: 'IT Operations Specialist',
        company: 'TONER Home Performance',
        location: 'Houston, TX',
        start: 'July 2016',
        end: 'Present',
        description: [
            `Executed the complete setup, configuration, and lifecycle management of employee workstations, laptops, and field equipment.`,
            `Acted as the sole Tier-1 and Tier-2 technician, rapidly resolving hardware malfunctions, OS corruptions, and network issues.`,
            `Configured and maintained secure internet equipment, optimizing local networks to ensure minimal downtime.`
        ]
    };

    switch (target) {
        case 'backend': {
            res.locals.data.subtitle = 'Backend Software Engineer | Node.js Developer | Systems Architecture';
            res.locals.data.skills = [
                {
                    type: 'Backend & Frameworks',
                    content: `Node.js, Express.js, Socket.io, HTMX, EJS, Discord.js`
                },
                {
                    type: 'Languages',
                    content: `JavaScript (ES6+), SQL, HTML5, CSS3, PHP, Bash, Python`
                },
                {
                    type: 'Databases',
                    content: `SQLite (better-sqlite3), MySQL, ElasticSearch, Relational Architecture`
                },
                {
                    type: 'Tools & Protocols',
                    content: `Git, GitHub, REST APIs, WebSockets, JSON/YAML, PM2, Cloudflare R2`
                }
            ];
            res.locals.data.employment = [
                {
                    title: 'Backend Software Engineer',
                    company: 'Independent Contracting',
                    start: 'August 2021',
                    end: 'Present',
                    description: [
                        `Architect and deploy RESTful APIs and dynamic web applications using Node.js, Express, and SQLite.`,
                        `Engineer dynamic Server-Side Rendering (SSR) pipelines with EJS, avoiding heavy client-side JavaScript overhead.`,
                        `Implement real-time data visualization and bidirectional communication using WebSockets (Socket.io) and HTMX.`,
                        `Design and optimize relational database schemas for high-traffic tracking applications, ensuring rapid query execution and data integrity.`
                    ]
                }
            ];
            res.locals.data.projects = [
                {
                    name: 'osu!complete',
                    stack: 'Node.js, Express, SQLite, HTMX, vanilla CSS/JS',
                    description: `Developed a high-performance completionist tracker and relational database architecture supporting over 2,200 active registered users. Designed complex SQLite schemas to track user scores and completion rates across hundreds of thousands of unique game levels.`
                },
                {
                    name: 'osu!dl',
                    stack: 'Node.js, Express, SQLite, HTMX, vanilla CSS/JS, Axios',
                    description: `Engineered a backend mirror and bulk downloader utilizing Node.js, SQLite, Axios, and Cloudflare R2 object storage, successfully handling the distribution of over 15 TB of user-downloaded data.`
                },
                {
                    name: 'express-file-index',
                    stack: 'Node.js, Express, vanilla CSS/JS',
                    description: `Developed and published an open-source npm middleware package for Express, providing a highly customizable file index complete with file previews and dynamic error handling.`
                },
                {
                    name: 'discord-chatgpt-v3',
                    stack: 'Node.js, Discord.js, OpenAI API',
                    description: `Built a Discord.js bot enabling natural conversations with OpenAI models, featuring a custom context-window system using SQLite and chunked message streaming to bypass platform character limits.`
                }
            ];
            break;
        }
        case 'it': {
            res.locals.data.subtitle = 'IT Operations Specialist | Systems Administrator | Network Infrastructure';
            res.locals.data.skills = [
                {
                    type: 'Infrastructure & Networking',
                    content: `Debian Linux, Cloudflare (DNS, Tunnels, R2 Storage), Tailscale, Samba, Apache, PM2, Docker, Port Forwarding`
                },
                {
                    type: 'Hardware & OS Setup',
                    content: `Windows Server/Desktop Administration, PC Hardware Troubleshooting, BIOS Configuration, Drive Partitioning, Dual-Booting`
                },
                {
                    type: 'Security & Access',
                    content: `SSH, (S)FTP, VPNs (Tailscale), Zero Trust Tunnels, Firewall Configuration`
                },
                {
                    type: 'Scripting & Utilities',
                    content: `Bash, Windows Batch, Git, Screen, tmux`
                }
            ];
            res.locals.data.employment = [
                jobTHP,
                {
                    title: 'Systems Administrator',
                    company: 'Independent Contracting',
                    start: 'August 2021',
                    end: 'Present',
                    description: [
                        `Manage remote headless Linux infrastructure via SSH, executing routine security updates, package management (APT), and system configurations across various VPS environments.`,
                        `Provision domains and proxies, manage DNS/SSL via Cloudflare, and secure private networks utilizing Tailscale and Cloudflare Tunnels.`,
                        `Maintain continuous uptime for web applications and community tools utilizing PM2 for process management and resource optimization.`
                    ]
                }
            ];
            res.locals.data.projects = [
                {
                    name: 'Sappho & Lesbos Production Servers',
                    stack: 'Ubuntu Server, Cloudflare Tunnel, Tailscale, Samba',
                    description: `Architected and deployed bare-metal and VPS Linux environments, utilizing Cloudflare Tunnels, Tailscale, and Samba. Optimized minimal OS footprint specifically for hosting secure, production applications and bulk storage.`
                },
                {
                    name: 'sftp-browser',
                    stack: 'Node.js, Express, vanilla HTML/CSS/JS',
                    description: `Developed a web-based SFTP file browser featuring a complete REST API to streamline secure remote file management, garnering community adoption with multiple GitHub forks.`
                }
            ];
            break;
        }
        case 'fullstack': {
            res.locals.data.subtitle = 'Full-Stack Software Engineer | Product Engineer';
            res.locals.data.skills = [
                {
                    type: 'Frontend',
                    content: `HTMX, EJS, HTML5/CSS3, Vanilla JavaScript (ES6+), WebSockets`
                },
                {
                    type: 'Backend',
                    content: `Node.js, Express.js, PHP, Python, Bash`
                },
                {
                    type: 'Databases',
                    content: `SQLite (better-sqlite3), MySQL, Relational Database Architecture`
                },
                {
                    type: 'Infra & DevOps',
                    content: `Debian Linux, Cloudflare (Tunnels, R2 Storage), Tailscale, PM2, Git`
                }
            ];
            res.locals.data.employment = [
                {
                    title: 'Full-Stack Software Engineer',
                    company: 'Independent Contracting',
                    start: 'August 2021',
                    end: 'Present',
                    description: [
                        `Architected dynamic web apps and REST APIs utilizing Node.js, Express, and SQLite.`,
                        `Engineered lightweight Server-Side Rendering (SSR) pipelines with EJS and HTMX, delivering high-performance, real-time user experiences without heavy client-side overhead.`,
                        `Managed headless Linux infrastructure, securing private networks with Tailscale and Cloudflare Tunnels, and ensuring continuous uptime utilizing PM2.`
                    ]
                },
                jobTHP
            ];
            res.locals.data.projects = [
                {
                    name: 'osu!complete',
                    stack: 'Node.js, Express, SQLite, HTMX, vanilla CSS/JS',
                    description: `Developed a high-performance completionist tracker and relational database architecture supporting over 2,200 active registered users. Designed complex SQLite schemas to track user scores and completion rates across hundreds of thousands of unique game levels.`
                },
                {
                    name: 'osu!dl',
                    stack: 'Node.js, Express, SQLite, HTMX, vanilla CSS/JS, Axios',
                    description: `Engineered a backend mirror and bulk downloader utilizing Node.js, SQLite, Axios, and Cloudflare R2 object storage, successfully handling the distribution of over 15 TB of user-downloaded data.`
                }
            ];
            break;
        }
        default: {
            res.locals.data.employment = [
                {
                    title: 'Full Stack Developer & System Administrator',
                    company: 'Independent Contracting',
                    start: 'August 2021',
                    end: 'Present',
                    description: [
                        `Architected and deployed scalable RESTful APIs and dynamic web applications using Node.js, Express, and SQLite.`,
                        `Managed Linux infrastructure via SSH, executing routine security updates and firewall configurations across VPS environments.`,
                        `Provisioned domains and proxies, managed DNS/SSL via Cloudflare, and secured networks using Tailscale and Cloudflare Tunnels.`,
                        `Maintained continuous uptime for community tools by utilizing PM2 for process management and resource optimization.`
                    ]
                },
                jobTHP
            ];
            res.locals.data.skills = [
                { type: 'Languages', content: `JavaScript (ES6+), SQL, HTML5, CSS3, Java, PHP, Bash, Python` },
                { type: 'Backend & Frameworks', content: `Node.js, Express.js, Socket.io, HTMX, EJS, Discord.js` },
                {
                    type: 'Infrastructure',
                    content: `Debian Linux, Cloudflare (DNS, Tunnels, R2 Storage), Tailscale, PM2, Apache, Docker`
                },
                {
                    type: 'Databases',
                    content: 'SQLite, MySQL, ElasticSearch'
                },
                {
                    type: 'Tools & Protocols',
                    content: 'Git, GitHub (Version Control), SSH, (S)FTP, REST APIs, WebSockets, JSON/YAML'
                }
            ];
            res.locals.data.projects = [
                {
                    name: 'osu!complete - High-performance leaderboard tracker',
                    stack: 'Node.js, SQLite, Express, Socket.io, EJS, HTMX',
                    description: [
                        `Developed a full-stack completionist tracker and relational database architecture supporting 2,000 active registered users.`,
                        `Engineered dynamic server-side rendering with EJS alongside WebSockets (Socket.io) and HTMX for real-time data visualization.`,
                        `Designed complex SQLite schemas to track user scores and completion rates across hundreds of thousands of unique game levels.`
                    ]
                }
            ];
            break;
        }
    }

    next();
});

module.exports = router;
