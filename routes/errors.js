const express = require('express');

const router = express.Router();

router.use((req, res) => {
    res.render('pages/error', {
        code: 404,
        message: `The resource you requested couldn't be found.`,
        pageSymbol: 'error',
        pageTitle: 'Error 404'
    });
});

router.use((err, req, res, next) => {
    console.error(err);
    res.render('pages/error', {
        code: 500,
        message: `An internal server error occurred. Please try again later and report this issue to kayla@kaysting.dev if it continues.`,
        pageSymbol: 'error',
        pageTitle: 'Error 500'
    });
});

module.exports = router;
