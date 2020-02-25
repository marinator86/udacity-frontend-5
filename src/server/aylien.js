var AYLIENTextAPI = require('aylien_textapi');
const APP_ID = "ec076eaf";
const APP_KEY = "f814651af07571a6a00ce150f229ae0d";
var textapi = new AYLIENTextAPI({
  application_id: APP_ID,
  application_key: APP_KEY
});

function sentiment(param){
    return new Promise((resolve, reject)=> {
    textapi.sentiment(param, function(error, response) {
        if (error === null) {
            resolve(response);
        } else {
            reject(error);
        }
        })
    });
}

module.exports = {
    //{text: msg}
    //{url: url}
    sentiment
}