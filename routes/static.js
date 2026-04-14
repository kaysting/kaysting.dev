const path = require('path');
const fs = require('fs');
const express = require('express');

const router = express.Router();

const INDEX_ROOT = path.join(__dirname, '../public');
const INDEX_FILES = ['index.ejs', 'index.html'];

router.use((req, res, next) => {
    // Normalize request path and get absolute file path
    let filePath = path.join(INDEX_ROOT, path.normalize(req.path));

    // Make sure target is within the root
    if (!filePath.startsWith(INDEX_ROOT)) return next();

    // Make sure target exists
    if (!fs.existsSync(filePath)) return next();

    // If target is a directory, check for index files
    if (fs.statSync(filePath).isDirectory()) {
        for (const fileName of INDEX_FILES) {
            // Change requested file path to the index file if it exists
            const indexFilePath = path.join(filePath, fileName);
            if (!fs.existsSync(indexFilePath)) continue;
            filePath = indexFilePath;
            break;
        }
    }

    // Make sure target exists
    if (!fs.existsSync(filePath)) return next();

    // Make sure target isn't a directory
    if (fs.statSync(filePath).isDirectory()) return next();

    // Decide what to do with the file
    switch (path.extname(filePath.toLowerCase())) {
        case '.ejs': {
            // Render EJS files
            return res.render(filePath, {
                data: req.data,
                query: req.query,
                body: req.body
            });
        }
        default: {
            return res.sendFile(filePath);
        }
    }
});

module.exports = router;
