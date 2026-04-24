const data = {
    pageId: 'unknown',
    pageTitle: '',
    pageSymbol: '',
    metaTitle: 'Welcome to kaysting.dev!',
    metaSiteName: 'kaysting.dev',
    metaDescription: `The personal website of Kayla Kersting. Explore her portfolio or check out this site's growing suite of useful tools.`,
    metaThemeColor: '#ebadc2',
    metaImage: '',

    tools: {
        weatherclock: {
            symbol: 'schedule',
            name: 'Weather Clock',
            description: `A fullscreen clock and weather webapp meant for use on a secondary screen, featuring automatic location detection, device sleep prevention, and a soft, time/weather-based colorful design.`,
            href: '/test/weatherclock'
        },
        uitest: {
            symbol: 'palette',
            name: 'UI Test Page (Debug)',
            description: `A UI element debugging and test page containing samples of most elements styled by this site's UI framework.`,
            href: '/tools/uitest'
        }
    }
};

data.sidebar = [
    { id: 'about', symbol: 'person', label: 'About me', href: '/' },
    { header: 'Tools' },
    ...Object.entries(data.tools).map(([id, tool]) => ({
        id,
        symbol: tool.symbol,
        label: tool.name,
        href: tool.href
    }))
];

// Global CSS and JS to link in head
data.css = ['material-symbols', 'base', 'layout', 'utils'];
data.js = ['base', 'layout'];

// Additional route-specific CSS and JS to link after the global files
data.cssLocal = [];
data.jsLocal = [];

module.exports = data;
