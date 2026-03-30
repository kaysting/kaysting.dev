const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    const ip = req.headers['cf-connecting-ip'];
    const ipApiRes = await axios.get(`http://ip-api.com/json/${ip}`);
    res.json(ipApiRes.data);
});

module.exports = router;
