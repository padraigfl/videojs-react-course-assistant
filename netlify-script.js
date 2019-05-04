const fs = require('fs');

fs.writeFileSync('./.env', `API_KEY=${process.env.YOUTUBE_API_KEY}\n`);
