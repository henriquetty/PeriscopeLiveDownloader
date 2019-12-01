const https = require('https');
const fs = require('fs');

const downloadChunk = (url, chunk) => {
    for (let i = 0; i < chunk.length; i++) {
        let file = fs.createWriteStream(`${chunk[i].replace('.ts?type=live', '')}.ts`);

        https.get(`${url}${chunk[i]}`, (res) => {
            res.pipe(file);
        });
    }
}

module.exports = downloadChunk;
