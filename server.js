require('dotenv').config({ quiet: true });

const express = require('express');
const dayjs = require('dayjs');
const layouts = require('express-ejs-layouts');

const PORT = process.env.PORT || 8080;

const app = express();
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    const forwardHosts = ['simplecyber.org', 'www.simplecyber.org', 'cybah.me', 'www.cybah.me'];
    if (forwardHosts.includes(req.headers.host)) {
        return res.redirect('https://kaysting.dev' + req.originalUrl);
    }
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] [${ip}] ${req.method} ${req.originalUrl}`);
    next();
});

app.use(layouts);

app.locals.meta = {
    pageTitle: '',
    siteName: 'kaysting.dev',
    title: `Hi, I'm Kayla!`,
    description: `The personal portfolio website of Kayla Kersting, a full-stack web developer. This site also features a growing suite of useful tools.`
};

app.use('/ip', require('./routes/ip'));
app.use('/resume', require('./routes/resume'));
app.use(require('./routes/redirects'));
app.use(require('./routes/static'));
app.use(require('./routes/home'));

app.use(require('./routes/errors'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
