import { appendTrip } from './DOMUpdater.js';

function handleEvent(event) {
    event.preventDefault();

    // check what text was put into the form field
    const tripRequest = {
        location: document.getElementById('location').value,
        dayFrom: document.getElementById('dayFrom').value,
        dayTo: document.getElementById('dayTo').value,
    }

    console.log("::: Form Submitted :::")
    return handleSubmit(tripRequest);
}

function handleSubmit(tripRequest) {
    return fetch('/trip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(tripRequest)
    })
    .then(res => res.json())
    .then(appendTrip);
}

export { handleEvent, handleSubmit }
