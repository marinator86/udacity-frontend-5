const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const trips = require('./trips.js');
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
    trips.createTravel(req.body).then(result => {
        res.status(200).send(result);
    }, error => {
        res.status(500).send(error.message);
    });
});