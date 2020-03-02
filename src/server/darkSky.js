// https://github.com/deanbot/dark-sky-api
const DarkSkyApi = require('dark-sky-api');
DarkSkyApi.apiKey = process.env.DARKSKY_KEY;
DarkSkyApi.proxy = true; 