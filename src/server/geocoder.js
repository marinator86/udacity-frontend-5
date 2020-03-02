const GeocoderGeonames = require('geocoder-geonames');
const geocoder = new GeocoderGeonames({
    username:      'marinator86',
});

/**
 * Returns 
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

module.exports = { search }