pixaBay = require('pixabay-api');
AUTH_KEY = process.env.PIXABAY_KEY;

function search(q){
    return pixaBay.searchImages(AUTH_KEY, q, {per_page: 3, category: 'places'})
    .then(result => {
        return result.hits[0].webformatURL;
    });
}

module.exports = { search };