const cp = require('child_process');

(async () => {

    console.log(`Ready to take snapshots`);

    const takeSnapshot = async () => {
        try {
            const ip = '192.168.1.244';
            const port = 554;
            const username = 'kaysting';
            const password = 'CRX7*tTc&UDMQKku41fq';
            const stream = 'stream1';
            const cmd = `ffmpeg -y -i "rtsp://${username}:${password}@${ip}:${port}/${stream}" -vframes 1 snapshot.png`;
            cp.execSync(cmd);
            console.log(`Snapshot taken`);
        } catch (error) {
            console.error(`Error taking snapshot: ${error.message}`);
        }
    };

    setInterval(takeSnapshot, 30 * 1000);
    takeSnapshot();

})();
