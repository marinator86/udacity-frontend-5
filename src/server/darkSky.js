// https://github.com/deanbot/dark-sky-api
const DarkSkyApi = require('dark-sky-api');
DarkSkyApi.units = 'si';
DarkSkyApi.apiKey = process.env.DARKSKY_KEY;
DarkSkyApi.proxy = true;
DarkSkyApi.extendHourly(false);

async function loadDay(day, lat, lon) {
    /*
    day = "2020-03-02T00:00:00"
    */
    const position = {
        latitude: lat, 
        longitude: lon
    }
    
    return DarkSkyApi.loadTime(day, position)
    .then(result => result.daily.data[0]);
}

module.exports = { loadDay }