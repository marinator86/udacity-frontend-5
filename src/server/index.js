const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const geocoder = require('./geocoder.js');
const weather = require('./darkSky.js');
const pix = require('./pixabay.js');
const trips = require('./trips.js');
const moment = require('moment');
const port = process.env.PORT || 8081;
app.use(cors());
app.use(express.static('dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname);

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

// Example: curl "localhost:8081/img?q=Stuttgart"
app.get('/img', (req, res) => {
    const q = req.query.q;
    pix.search(q).then(result => {
        res.status(200).send(result);
    }, error => {
        res.status(500).send(error.message);
    });
});

// Example: curl "localhost:8081/weather?dayFrom=2020-03-02T00:00:00&dayTo=2020-03-05T00:00:00&lat=48.78232&lon=9.17702"
app.get('/weather', (req, res) => {
    const dayFrom = moment(req.query.dayFrom);
    const dayTo = moment(req.query.dayTo);
    const lat = req.query.lat;
    const lon = req.query.lon;

    weather.loadDaysFromTo(dayFrom, dayTo, lat, lon).then(result => {
        res.status(200).send(result);
    }, error => {
        res.status(500).send(error.message);
    });
});

// Example: curl "localhost:8081/geoSearch?q=Stuttgart"
app.get('/geoSearch', (req, res) => {
    const query = req.query.q;
    geocoder.search(query).then(result => {
        res.status(200).send(result);
    }, error => {
        res.status(500).send(error.message);
    });
});

// Example: curl "localhost:8081/geoInfo?geonameId=2825297"
app.get('/geoInfo', (req, res) => {
    const geonameId = req.query.geonameId;
    geocoder.getInfo(geonameId).then(result => {
        res.status(200).send(result);
    }, error => {
        res.status(500).send(error.message);
    });
});

// Example: curl localhost:8081/trips
app.get('/trips', function(req, res) {
    res.status(200).send(trips.getAllTrips());
});

/**
 * Each trip request will need the
 * geonameId, startDate and endDate.
 * Example: curl -X POST -H "Content-Type: application/json" --data '{"location": "Paris","dayFrom":"2020-04-02T00:00:00", "dayTo":"2020-04-05T00:00:00"}' "localhost:8081/trip"
 * Response will contain the complete trip info.
 */
app.post('/trip', function(req, res) {
    console.log("trip added: " + JSON.stringify(req.body));
    trips.createTrip(req.body).then(result => {
        res.status(200).send(result);
    }, error => {
        res.status(500).send(error.message);
    });
});

// Example: curl -X DELETE "localhost:8081/trip?id=Paris2020-04-02T00:00:00"
app.delete('/trip', function(req, res) {
    console.log(`trip delete: ${req.query.id}`);
    trips.deleteTrip(req.query.id);
    res.status(200).send();
});