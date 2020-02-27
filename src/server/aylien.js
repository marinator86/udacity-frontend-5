var AYLIENTextAPI = require('aylien_textapi');
const APP_ID = "ec076eaf";
const APP_KEY = "f814651af07571a6a00ce150f229ae0d";
var textapi = new AYLIENTextAPI({
  application_id: APP_ID,
  application_key: APP_KEY
});

/**
 * Looks up the sentiment for a given url or a text.
 * The parameter is an object containing either a 
 * text or url param. 
 * Examples:
 * {text: "John is a very good programmer"},
 * {url: "https://www.businessinsider.de/international/us-life-expectancy-declined-for-third-year-in-a-row-2019-11"}
 * Returns the raw response of the alyien sentiment API.
 * 
 * @param {*} param the parameter object
 */
function sentiment(param){
    return new Promise((resolve, reject)=> {
        textapi.sentiment(param, function(error, response) {
            if (error === null) {
                resolve(response);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = {
    sentiment
}