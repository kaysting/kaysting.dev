const express = require('express');

const router = express.Router();

router.get('/home', async (req, res) => {
    res.render('pages/home', { pageId: 'home', pageTitle: 'Home', pageSymbol: 'home' });
});

router.get('/', async (req, res) => {
    res.render('pages/about', {
        pageId: 'about',
        pageTitle: `About me`,
        pageSymbol: 'person',
        metaTitle: `Hi, I'm Kayla!`,
        metaDescription: `I'm a recent CS grad who's spent the past decade teaching myself full-stack web development, system administration, and IT operations through my family's business. I have a passion for building things people love, having solo-developed several successful projects. Click to see my full portfolio!`,

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
                label: 'Kayla (ISTJ-A)',
                href: 'https://www.16personalities.com/profiles/35b15de7a00c8'
            }
        ],

        projects: [
            {
                logo: 'kaystingdev.png',
                name: 'kaysting.dev',
                desc: `This website. My modern, responsive developer portfolio, a growing suite of useful online tools, and a robust, vanilla CSS/JS UI framework.`,
                website: '/',
                github: 'https://github.com/kaysting/kaysting.dev'
            },
            {
                logo: 'osucomplete.png',
                name: 'osu!complete',
                desc: `A modern, feature-rich osu! completionist tracker and leaderboard with real-time updates, history tracking, play next algorithm, and more.`,
                website: 'https://osucomplete.org',
                github: 'https://github.com/kaysting/osucomplete'
            },
            {
                logo: 'osudl.png',
                name: 'osu!dl',
                desc: `The fastest osu! beatmap bulk downloader out there, featuring complex search filtering and unlimited, direct-to-folder bulk downloads.`,
                website: 'https://osudl.org',
                github: 'https://github.com/kaysting/osudl'
            },
            {
                symbol: 'cached',
                name: 'osu-score-cache',
                desc: `A JSON API and real-time WebSocket providing access to recent passing scores submitted to the osu! servers across all game modes and map statuses.`,
                website: 'https://osc.kaysting.dev/',
                github: 'https://github.com/kaysting/osu-score-cache'
            },
            {
                logo: 'express-file-index.png',
                name: 'express-file-index',
                desc: `An Express middleware that serves static files and provides a navigable file index while being lightweight, customizable, and easy to add to existing projects.`,
                github: 'https://github.com/kaysting/express-file-index'
            },
            {
                symbol: 'robot_2',
                name: 'discord-chatgpt-v3',
                desc: `A Discord bot that allows holding natural text conversations with OpenAI models. Uses Discord message history for context, supports file uploads, and more.`,
                github: 'https://github.com/kaysting/discord-chatgpt-v3'
            },
            {
                logo: 'blahajbot.png',
                name: 'BlahajBot',
                desc: `An all-purpose Discord bot created for the TransGamers Discord community, with commands and custom functions for moderation, utility, and fun.`,
                github: 'https://github.com/kaysting/transgamers/tree/main/leveling-bot'
            },
            {
                symbol: 'speech_to_text',
                name: 'ai-note-taker',
                desc: `A simple, client-side webapp that uses OpenAI's whisper and GPT models to transcribe audio and generate notes, summaries, or similar content.`,
                github: 'https://github.com/kaysting/ai-note-taker',
                website: 'https://notetaker.cybah.me/'
            },
            {
                symbol: 'network_node',
                name: 'linux-screen-wrapper',
                desc: `A wrapper for the Linux screen command that adds friendly, colored command output and the ability to resume sessions with incomplete names.`,
                github: 'https://github.com/kaysting/linux-screen-wrapper'
            },
            {
                symbol: 'smb_share',
                name: 'sftp-browser',
                desc: `A web-based SFTP file browser that makes remote file management easy with its responsive UI and full-featured REST API.`,
                github: 'https://github.com/kaysting/sftp-browser'
            },
            {
                symbol: 'folder',
                name: 'cyberfiles-lite',
                desc: `A (not-so) bare-bones file index built to work with Node.js Express and look like GitHub's file browser. Complete with thumbnails, file previewing, and more.`,
                github: 'https://github.com/kaysting/cyberfiles-lite'
            },
            {
                symbol: 'edit_square',
                name: 'CyberRename',
                desc: `A simple plugin for Spigot Minecraft servers that allows players to change the name and lore of their items with commands.`,
                github: 'https://github.com/kaysting/spigot-rename'
            },
            {
                symbol: 'skull',
                name: 'CyberDeathMessages',
                desc: `A Spigot plugin that overrides the default death messages with super customizable ones using the comprehensive config file.`,
                github: 'https://github.com/kaysting/spigot-deaths'
            },
            {
                symbol: 'edit_location',
                name: 'CyberTPR',
                desc: `A simple random teleportation plugin for Spigot Minecraft servers featuring always-safe teleportation and customizeable radius options.`,
                github: 'https://github.com/kaysting/spigot-tpr'
            }
        ]
    });
});

router.get('/tools', async (req, res) => {
    res.render('pages/tools', { pageId: 'tools', pageTitle: 'Tools', pageSymbol: 'apps' });
});

router.get('/test', async (req, res) => {
    res.render('pages/tools/uitest', { pageId: 'uitest', pageTitle: 'UI Test Page', pageSymbol: 'palette' });
});

module.exports = router;
