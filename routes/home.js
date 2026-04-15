const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('pages/home');
});

router.get('/test', async (req, res) => {
    res.render('pages/test');
});

module.exports = router;
