const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const geocoder = require('./geocoder.js');
const weather = require('./darkSky.js');
const pix = require('./pixabay.js');
const moment = require('moment');

app.use(express.static('dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
console.log(__dirname)

app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const testResponse = {
    id: "24abf2-5643ff",
    startDate: "2020-04-02",
    endDate: "2020-04-07",
    location: {
        geonameId: 1231243,
        name: "Palma",
        lat: 39.5693900,
        long: 2.6502400
    },
    weather: {

    },
    image: "https://www.recordrentacar.com/blog/wp-content/uploads/2013/08/shutterstock_268209080-1_1.jpg"
};

app.get('/img', (req, res) => {
    const q = req.query.q;
    pix.search(q).then(result => {
        res.status(200).send(result);
    }, error => {
        res.status(500).send(error.message);
    });
});

// weather?dayFrom=2020-03-02T00:00:00&dayTo=2020-03-05T00:00:00&lat=&lon=
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

// geoSearch?q=Stuttgart
app.get('/geoSearch', (req, res) => {
    const query = req.query.q;
    geocoder.search(query).then(result => {
        res.status(200).send(result);
    }, error => {
        res.status(500).send(error.message);
    });
});

// geoInfo?geonameId=2312343
app.get('/geoInfo', (req, res) => {
    const geonameId = req.query.geonameId;
    geocoder.getInfo(geonameId).then(result => {
        res.status(200).send(result);
    }, error => {
        res.status(500).send(error.message);
    });
});

app.get('trips', function(req, res) {
    res.status(200).send([testResponse]);
});

/**
 * Each trip request will need the
 * geonameId, startDate and endDate.
 * 
 * Response will contain the complete trip info.
 */
app.post('/trip', function(req, res) {
    console.log("trip added: " + JSON.stringify(req.body));
    res.status(200).send(testResponse);
});

app.delete('/trip/:tripId', function(req, res) {
    console.log(`trip delete: ${tripId}`);
    res.status(200);
});