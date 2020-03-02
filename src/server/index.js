const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const geocoder = require('./geocoder.js');
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
        name: "Palma",
        lat: 39.5693900,
        long: 2.6502400
    },
    weather: {

    },
    image: "https://www.recordrentacar.com/blog/wp-content/uploads/2013/08/shutterstock_268209080-1_1.jpg"
};

app.get('/search', (req, res) => {
    const query = req.query.q;
    geocoder.search(query).then(result => {
        res.status(200).send(result);
    }, error => {
        res.status(500).send(error.message);
    });
});

app.get('trips', function(req, res) {
    res.status(200).send([testResponse]);
});

app.post('/trip', function(req, res) {
    console.log("trip added: " + JSON.stringify(req.body));
    res.status(200).send(testResponse);
});

app.delete('/trip/:tripId', function(req, res) {
    console.log(`trip delete: ${tripId}`);
    res.status(200);
});