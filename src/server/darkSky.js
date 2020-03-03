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

async function loadDaysFromTo(dayFrom, dayTo, lat, lon){
    if(!dayTo.isAfter(dayFrom)){
        throw new Error(`Date ${dayTo} is not after ${dayFrom}`);
    }

    const daysBetween = dayTo.diff(dayFrom, 'days');
    const days = [];

    arr = [...Array(daysBetween + 1).keys()];
    for(additional of arr.map(i => ++i)){
        const newDate = dayFrom.clone().add(additional, 'd');
        days.push(newDate);
    }

    return loadDays(days, lat, lon);
}

async function loadDays(days, lat, lon) {
    const dailyPromises = [];
    days.forEach(day => {
        dailyPromises.push(loadDay(day, lat, lon));
    });
    return Promise.all(dailyPromises);
}

module.exports = { loadDay, loadDays, loadDaysFromTo }