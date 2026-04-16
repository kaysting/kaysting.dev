const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('pages/home', { pageId: 'home' });
});

router.get('/about', async (req, res) => {
    res.render('pages/about', {
        pageId: 'about',
        pageTitle: `Hi, I'm Kayla!`,
        metaTitle: `Hi, I'm Kayla!`,
        metaDescription: `I'm a recent college graduate and mostly self-taught full-stack web developer and system administrator. Click to learn more about me!`
    });
});

router.get('/tools', async (req, res) => {
    res.render('pages/tools', { pageId: 'tools' });
});

router.get('/test', async (req, res) => {
    res.render('pages/tools/uitest', { pageId: 'uitest' });
});

module.exports = router;
