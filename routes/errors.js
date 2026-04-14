const express = require('express');

const router = express.Router();

router.use((req, res) => {
    res.render('pages/error', {
        code: 404,
        message: `The resource you requested couldn't be found.`
    });
});

router.use((err, req, res, next) => {
    console.error(err);
    res.render('pages/error', {
        code: 500,
        message: `An internal server error occurred. Please try again later and report this issue to kayla@kaysting.dev if it continues.`
    });
});

module.exports = router;
