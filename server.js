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

app.locals.pageId = 'unknown';
app.locals.pageTitle = 'Home';
app.locals.metaTitle = 'Welcome to kaysting.dev!';
app.locals.metaSiteName = 'kaysting.dev';
app.locals.metaDescription = `The personal website of Kayla Kersting. Explore her portfolio or check out this site's growing suite of useful tools.`;
app.locals.metaThemeColor = '#ebadc2';

app.locals.tools = {
    uitest: {
        symbol: 'palette',
        name: 'UI Test Page',
        description: `A UI element debugging and test page containing samples of most elements styled by this site's UI framework.`,
        href: '/test'
    }
};

app.locals.sidebar = [
    { id: 'home', symbol: 'home', label: 'Home', href: '/' },
    { id: 'about', symbol: 'person', label: 'About me', href: '/about' },
    { id: 'tools', symbol: 'apps', label: 'Tools overview', href: '/tools' },
    { header: 'Tools' },
    ...Object.entries(app.locals.tools).map(([id, tool]) => ({
        id,
        symbol: tool.symbol,
        label: tool.name,
        href: tool.href
    }))
];

app.use('/ip', require('./routes/ip'));
app.use('/resume', require('./routes/resume'));
app.use(require('./routes/redirects'));
app.use(require('./routes/static'));
app.use(require('./routes/home'));

app.use(require('./routes/errors'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
