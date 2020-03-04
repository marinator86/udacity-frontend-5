const moment = require('moment');

function appendTrip(res) {
    const results = document.getElementById('results');
        
    const resultbox = document.createElement('div');
    resultbox.setAttribute('id', res.id);
    const trip = res.trip;
    const title = document.createElement('div');
    const image = document.createElement('div');
    const dates = document.createElement('div');
    const weatherBox = document.createElement('div');

    resultbox.classList.add('resultbox');
    title.classList.add('title');
    image.classList.add('image');
    dates.classList.add('dates');
    weatherBox.classList.add('weatherBox');


    const context = {
        maxHeight: 10,
        tMax: Math.max(...trip.weather.map(w => w.temperatureHigh), 25),
        tMin: Math.min(...trip.weather.map(w => w.temperatureLow), 5),
    };

    trip.weather.forEach(w => createWeatherDay(context, weatherBox, w));

    title.textContent = trip.location;
    image.style.backgroundImage = `url('${trip.imageLink}')`;
    dates.textContent = `${moment(trip.dayFrom).format('MMM Do')} until ${moment(trip.dayTo).format('MMM Do')}`;

    resultbox.appendChild(title);
    resultbox.appendChild(image);
    resultbox.appendChild(dates);
    resultbox.appendChild(weatherBox);

    results.appendChild(resultbox);
}

function createWeatherDay(ctx, weatherBox, weather){
    // margin-top, height and margin-bottom form three divisions
    const wholeRange = ctx.tMax - ctx.tMin;
    const dayMax = Math.round(weather.temperatureHigh * 10)/10;
    const dayMin = Math.round(weather.temperatureLow * 10)/10;

    const marginTop = ctx.maxHeight * (ctx.tMax - dayMax) / wholeRange;
    const marginBottom = ctx.maxHeight * (dayMin - ctx.tMin) / wholeRange;
    const height = ctx.maxHeight * (dayMax - dayMin) / wholeRange;

    const dayBox = document.createElement('div');
    dayBox.classList.add('dayBox');

    const top = document.createElement('div');
    top.classList.add('top');
    top.textContent = `${dayMax}°`;

    const day = document.createElement('div');
    day.classList.add('day');
    day.style.marginTop = `${marginTop}em`;
    day.style.marginBottom = `${marginBottom}em`;
    day.style.height = `${height}em`;

    const bottom = document.createElement('div');
    bottom.classList.add('bottom');
    bottom.textContent = `${dayMin}°`;

    dayBox.appendChild(top)
    dayBox.appendChild(day)
    dayBox.appendChild(bottom);
    weatherBox.appendChild(dayBox);
}

export {
    appendTrip
}