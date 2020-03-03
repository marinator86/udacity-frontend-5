function appendTrip(res) {
    const results = document.getElementById('results');
        
    const resultbox = document.createElement('div');
    resultbox.setAttribute('id', res.id);
    const trip = res.trip;
    const title = document.createElement('div');
    const image = document.createElement('div');
    const dates = document.createElement('div');
    const text = document.createElement('div');

    resultbox.classList.add('resultbox');
    title.classList.add('title');
    image.classList.add('image');
    dates.classList.add('dates');
    text.classList.add('text');

    title.textContent = trip.location;
    image.style.backgroundImage = `url('${trip.imageLink}')`;
    dates.textContent = `${trip.dayFrom} until ${trip.dayTo}`;

    resultbox.appendChild(title);
    resultbox.appendChild(image);
    resultbox.appendChild(dates);
    resultbox.appendChild(text);

    results.appendChild(resultbox);
}

export {
    appendTrip
}