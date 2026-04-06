const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    req.data = {
        title: 'Kayla Kersting',
        subtitle: 'Computer Science Graduate | Full-Stack Developer | System Administrator',
        chips: [
            { symbol: 'location_on', label: 'Salem, MA' },
            {
                symbol: 'email',
                link: 'mailto:kayla@kaysting.dev',
                label: 'kayla@kaysting.dev'
            },
            {
                symbol: 'call',
                link: 'tel:832-231-4068',
                label: '832-231-4068'
            },
            {
                symbol: 'language',
                link: 'https://kaysting.dev',
                label: 'kaysting.dev'
            },
            {
                symbol: 'code',
                link: 'https://github.com/kaysting',
                label: 'github/kaysting'
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
        ],
        employment: [
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
            {
                title: 'IT Operations Specialist',
                company: 'TONER Home Performance',
                location: 'Houston, TX',
                start: 'August 2021',
                end: 'Present',
                description: [
                    `Executed the complete setup, configuration, and lifecycle management of employee workstations, laptops, and field equipment.`,
                    `Acted as the sole Tier-1 and Tier-2 technician, rapidly resolving hardware malfunctions, OS corruptions, and network issues.`,
                    `Configured and maintained secure internet equipment, optimizing local networks to ensure minimal downtime.`
                ]
            }
        ],
        skills: [
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
        ],
        projects: [
            {
                name: 'osu!complete - High-performance leaderboard tracker',
                stack: 'Node.js, SQLite, Express, Socket.io, EJS, HTMX',
                description: [
                    `Developed a full-stack completionist tracker and relational database architecture supporting 2,000 active registered users.`,
                    `Engineered dynamic server-side rendering with EJS alongside WebSockets (Socket.io) and HTMX for real-time data visualization.`,
                    `Designed complex SQLite schemas to track user scores and completion rates across hundreds of thousands of unique game levels.`
                ]
            }
            /*
            {
                name: 'osu!dl - Search engine & file mirror',
                stack: 'Node.js, SQLite (+FTS), Express, EJS, HTMX, Cloudflare R2',
                description: [
                    `Engineered a high-performance search engine using SQLite FTS to query large datasets with sub-second latency.`,
                    `Integrated Cloudflare R2 object storage to efficiently manage and serve over 10 TB of bulk user downloads.`,
                    `Implemented dynamic front-end interactions and real-time UI updates using HTMX and Express.`
                ]
            },
            {
                name: 'Production Server Infrastructure',
                stack: 'Ubuntu Server, Cloudflare Tunnels, Tailscale, SSH, PM2',
                description: [
                    `Provisioned bare-metal Linux servers to securely host multiple production web applications and databases.`,
                    `Secured internal networking and bypassed NAT restrictions using Tailscale and Cloudflare Tunnels.`,
                    `Automated application lifecycles and ensured continuous uptime using PM2 for resource monitoring.`
                ]
            }
            */
        ]
    };
    next();
});

module.exports = router;
