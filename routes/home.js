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
        metaDescription: `I'm a recent college graduate and mostly self-taught full-stack web developer and system administrator. Click to learn more about me!`,

        socials: [
            { symbol: 'email', label: 'kayla@kaysting.dev', href: 'mailto:kayla@kaysting.dev' },
            { logo: 'discord-color', label: 'kaysting', href: 'https://discord.com/app' },
            { logo: 'github', label: 'kaysting', href: 'https://github.com/kaysting' },
            { logo: 'npm-color', label: 'cybergen49', href: 'https://www.npmjs.com/~cybergen49' },
            { logo: 'reddit-color', label: 'cybergen49', href: 'https://discord.com/app' },
            { logo: 'youtube-color', label: 'kaystingdev', href: 'https://youtube.com/@kaystingdev' },
            { logo: 'instagram-color', label: 'kaystingdev', href: 'https://www.instagram.com/kaystingdev' },
            { logo: 'spotify-color', label: 'Kayla', href: 'https://open.spotify.com/user/dbqectp3dtptpcbdjm5nz9jaa' },
            { logo: 'osu-color', label: 'kaysting', href: 'https://osu.ppy.sh/users/22737645' },
            { logo: 'steam-color', label: 'kaysting', href: 'https://steamcommunity.com/id/kaysting/' },
            { logo: 'monkeytype-color', label: 'kaysting', href: 'https://monkeytype.com/profile/kaysting' },
            {
                logo: 'googlemaps-color',
                label: 'Kayla',
                href: 'https://www.google.com/maps/contrib/103985333402100090631'
            },
            {
                logo: '16personalities-color',
                label: 'Kayla (ISFJ-T)',
                href: 'https://www.16personalities.com/profiles/35b15de7a00c8'
            }
        ],

        projects: []
    });
});

router.get('/tools', async (req, res) => {
    res.render('pages/tools', { pageId: 'tools', pageTitle: 'Tools', pageSymbol: 'apps' });
});

router.get('/test', async (req, res) => {
    res.render('pages/tools/uitest', { pageId: 'uitest', pageTitle: 'UI Test Page', pageSymbol: 'palette' });
});

module.exports = router;
