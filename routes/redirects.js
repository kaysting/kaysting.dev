const express = require('express');
const router = express.Router();

const redirects = require('../redirects.json');

for (const [slug, url] of Object.entries(redirects)) {
    router.get(`/${slug}`, async (req, res) => {
        res.redirect(url);
    });
}

module.exports = router;
