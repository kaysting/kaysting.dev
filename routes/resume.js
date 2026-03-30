const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    req.data = {
        title: 'Kayla Kersting',
        subtitle: 'Versatile computer scientist and IT specialist.',
        chips: [
            [
                { symbol: 'location_on', label: 'Salem, MA' },
                {
                    symbol: 'email',
                    link: 'mailto:kayla@kaysting.dev',
                    label: 'kayla@kaysting.dev'
                },
                {
                    symbol: 'call',
                    link: 'tel:832-231-4068',
                    label: '832-231-4068'
                }
            ],
            [
                {
                    symbol: 'language',
                    link: 'https://kaysting.dev',
                    label: 'kaysting.dev'
                },
                {
                    symbol: 'code',
                    link: 'https://github.com/kaysting',
                    label: 'github.com/kaysting'
                }
            ]
        ],
        education: [],
        employment: [],
        skills: [],
        projects: []
    };
    next();
});

module.exports = router;
