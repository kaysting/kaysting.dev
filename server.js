require('dotenv').config({ quiet: true });

const path = require('path');
const fs = require('fs');
const express = require('express');
const dayjs = require('dayjs');

const ROUTES_DIR = path.join(__dirname, 'routes');
const PORT = process.env.PORT || 8080;

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

const routes = [
    //
    { path: '/ip', file: 'ip' },
    { path: '/resume', file: 'resume' },
    { file: 'static' }
];

for (const data of routes) {
    const router = require(path.join(ROUTES_DIR, data.file));
    if (data.path) app.use(data.path, router);
    else app.use(router);
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
