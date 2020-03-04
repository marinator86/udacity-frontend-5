import { appendTrip } from './DOMUpdater.js';

function loadInit() {
    return fetch('http://localhost:8081/trips')
    .then(res => res.json())
    .then(trips => trips.forEach(appendTrip));
}

export { loadInit }