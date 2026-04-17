const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('pages/home', { pageId: 'home', pageTitle: 'Home', pageSymbol: 'home' });
});

router.get('/about', async (req, res) => {
    res.render('pages/about', {
        pageId: 'about',
        pageTitle: `About me`,
        pageSymbol: 'person',
        metaTitle: `Hi, I'm Kayla!`,
        metaDescription: `I'm a recent college graduate and mostly self-taught full-stack web developer and system administrator. Click to learn more about me!`
    });
});

router.get('/tools', async (req, res) => {
    res.render('pages/tools', { pageId: 'tools', pageTitle: 'Tools', pageSymbol: 'apps' });
});

router.get('/test', async (req, res) => {
    res.render('pages/tools/uitest', { pageId: 'uitest', pageTitle: 'UI Test Page', pageSymbol: 'palette' });
});

module.exports = router;
