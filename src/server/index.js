var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const aylien = require('./aylien.js')   
app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/sentiment', function(req, res){
    console.log("Alyien analysis requested: " + JSON.stringify(req.body));
    
    aylien.sentiment(req.body)
    .then(result => {
        res.send(result)
    }, error => {
        console.log("Error happened duing alyien request: "  +error.message);
        res.status(500).send(error.message)
    });
});