module.exports = {
    apps: [
        {
            name: 'kaysting.dev',
            script: 'node',
            args: 'server.js',
            cwd: './',
            watch: ['server.js', 'routes', 'data/*.js']
        }
    ]
};
