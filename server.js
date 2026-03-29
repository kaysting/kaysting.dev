const path = require('path');
const express = require('express');
const dayjs = require('dayjs');
const axios = require('axios');
const fs = require('fs');

const port = 8255;
const app = express();

app.use((req, res, next) => {
    const forwardHosts = ['simplecyber.org', 'www.simplecyber.org', 'cybah.me', 'www.cybah.me'];
    if (forwardHosts.includes(req.headers.host)) {
        return res.redirect('https://kaysting.dev' + req.originalUrl);
    }
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] [${ip}] ${req.method} ${req.originalUrl}`);
    next();
});

app.get('/ip', async (req, res) => {
    const ip = req.headers['cf-connecting-ip'];
    const ipApiRes = await axios.get(`http://ip-api.com/json/${ip}`);
    res.json(ipApiRes.data);
});

app.get('/resume', (req, res, next) => {
    req.data = {
        title: 'Kayla Kersting',
        subtitle: 'Versatile computer scientist and IT specialist with over 10 years of practical experience.',
        chips: [
            [
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
                }
            ],
            [
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
            ]
        ],
        education: [],
        employment: [],
        skills: [],
        projects: []
    };
    next();
});

const INDEX_ROOT = path.join(__dirname, 'public');
const INDEX_FILES = ['index.ejs', 'index.html'];

app.use((req, res, next) => {
    // Normalize request path and get absolute file path
    let filePath = path.join(INDEX_ROOT, path.normalize(req.path));

    // Make sure target is within the root
    if (!filePath.startsWith(INDEX_ROOT)) return next();

    // Make sure target exists
    if (!fs.existsSync(filePath)) return next();

    // If target is a directory, check for index files
    if (fs.statSync(filePath).isDirectory()) {
        for (const fileName of INDEX_FILES) {
            // See if this index file exists
            const indexFilePath = path.join(filePath, fileName);
            if (!fs.existsSync(indexFilePath)) continue;

            // Change requested file path to the index file
            filePath = indexFilePath;
            break;
        }
    }

    // Make sure target exists
    if (!fs.existsSync(filePath)) return next();

    // Make sure target isn't a directory
    if (fs.statSync(filePath).isDirectory()) return next();

    // Decide what to do with the file
    switch (path.extname(filePath.toLowerCase())) {
        case '.ejs': {
            // Render EJS files
            return res.render(filePath, {
                data: req.data,
                query: req.query,
                body: req.body
            });
        }
        default: {
            return res.sendFile(filePath);
        }
    }
});

app.listen(port, () => console.log(`Listening on ${port}`));
