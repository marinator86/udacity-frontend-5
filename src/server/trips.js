const geocoder = require('./geocoder.js');
const weather = require('./darkSky.js');
const pix = require('./pixabay.js');
const moment = require('moment');

const trips = [];

// validate
function isValid(tripRequest) {
    if(tripRequest != 'undefined') return true;
    return false;
}

// create trip - transforms a trip request to a trip info
async function createTrip(tripRequest) {
    if(!isValid(tripRequest)) throw new Error("Your fucking trip is invalid");
    const trip = {};
    trip.location = tripRequest.location;
    trip.dayFrom = tripRequest.dayFrom;
    trip.dayTo = tripRequest.dayTo;


    return geocoder.search(tripRequest.location).then(result => {
        trip.lat = result[0].lat;
        trip.lon = result[0].lng;
        const dayFrom = moment(tripRequest.dayFrom);
        const dayTo = moment(tripRequest.dayTo);
        
        return weather.loadDaysFromTo(dayFrom, dayTo, trip.lat, trip.lon);
    }).then(weather => {
        trip.weather = weather;
        return pix.search(trip.location);
    }).then(result => {
        trip.imageLink = result;
        tripWrapper = {
            id: trip.location + trip.dayFrom,
            trip: trip,
        }
        trips.push(tripWrapper);
        return tripWrapper;
    });
}

// delete trip
function deleteTrip(id) {
    const newTrips = trips.filter(trip => {
        return trip.id != id
    });
    trips.length = 0;
    trips.push(...newTrips);
}

// get all trips
function getAllTrips() {
    return trips;
}

module.exports = { createTrip, getAllTrips, deleteTrip };