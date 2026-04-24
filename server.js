require('dotenv').config({ quiet: true });

const express = require('express');
const dayjs = require('dayjs');
const layouts = require('express-ejs-layouts');

const app = express();
app.set('view engine', 'ejs');

Object.assign(app.locals, require('./data/globals'));

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
app.use(express.static('public'));

app.use(require('./routes/generic'));

app.use((req, res) => {
    res.render('pages/error', {
        code: 404,
        message: `The resource you requested couldn't be found.`,
        pageSymbol: 'error',
        pageTitle: 'Error 404'
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.render('pages/error', {
        code: 500,
        message: `An internal server error occurred. Please try again later and report this issue to kayla@kaysting.dev if it continues.`,
        pageSymbol: 'error',
        pageTitle: 'Error 500'
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
