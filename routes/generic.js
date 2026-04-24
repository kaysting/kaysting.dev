const express = require('express');
const axios = require('axios');
const renderPage = require('../utils/renderPage');
const globals = require('../data/globals');

const router = express.Router();

// Set meta details for tool pages ahead of time
for (const [id, tool] of Object.entries(globals.tools)) {
    router.get(tool.href, (req, res, next) => {
        res.locals.pageId = id;
        res.locals.pageTitle = tool.name;
        res.locals.metaTitle = tool.name;
        res.locals.pageSymbol = tool.symbol;
        res.locals.metaDescription = tool.description;
        next();
    });
}

// Basic page routes
router.get('/home', renderPage('pages/home', { pageId: 'home', pageTitle: 'Home', pageSymbol: 'home' }));
router.get('/', renderPage('pages/about', require('../data/about')));
router.get('/tools', renderPage('pages/tools', { pageId: 'tools', pageTitle: 'Tools', pageSymbol: 'apps' }));
router.get('/tools/uitest', renderPage('pages/tools/uitest'));

// Dynamic targeted resume page
router.get('/resume', (req, res) => {
    const target = req.query.target;
    const data = require('../data/resume')(target);
    res.render('pages/resume', { data, target, layout: false });
});

// IP geolocation API route
router.get('/ip{/:address}', async (req, res) => {
    const ip = req.params?.address ?? req.headers['cf-connecting-ip'];
    const ipApiRes = await axios.get(`http://ip-api.com/json/${ip}`);
    res.json(ipApiRes.data);
});

// Redirects
const redirects = require('../data/redirects');
for (const [slug, url] of Object.entries(redirects)) {
    router.get(`/${slug}`, async (req, res) => {
        res.redirect(url);
    });
}

module.exports = router;
