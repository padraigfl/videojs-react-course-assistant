const fs = require('fs');

fs.writeFileSync('./.env', `YOUTUBE_API_KEY=${process.env.YOUTUBE_API_KEY}\n`);
console.log(process.env.YOUTUBE_API_KEY);
