// https://github.com/StephanGeorg/geocoder-geonames    
const GeocoderGeonames = require('geocoder-geonames');
const geocoder = new GeocoderGeonames({
    username: process.env.GEONAMES_USER,
});

/**
 * Returns search for a term 
 * @param {string} query the query - a city at best
 */
async function search(query) {
    return geocoder.get('search',{
        q: query,
        maxRows: 10
    }).then(apiResult => {
        return apiResult.geonames.map(result => {
            return {
                geonameId: result.geonameId,
                name: result.name,
                lat: result.lat,
                lng: result.lng,
            };
        })
    }); 
}

/**
 * Returns detailed Info from geonames.org
 * @param {string} geonameId the geonameId 
 */
async function getInfo(geonameId) {
    return geocoder.get('get',{
        geonameId: geonameId,
    }); 
}

module.exports = { search, getInfo }