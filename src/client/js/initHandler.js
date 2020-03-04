import { appendTrip } from './DOMUpdater.js';

function loadInit() {
    return fetch('/trips')
    .then(res => res.json())
    .then(trips => trips.forEach(appendTrip));
}

export { loadInit }