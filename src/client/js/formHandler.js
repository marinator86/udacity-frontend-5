const DOMUpdater = require('./DOMUpdater.js');

function handleEvent(event) {
    event.preventDefault();

    // check what text was put into the form field
    const url = document.getElementById('name').value;

    console.log("::: Form Submitted :::")
    return handleSubmit(url);
}

function handleSubmit(url) {
    return fetch('http://localhost:8081/sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({url: url})
    })
    .then(res => res.json())
    .then(json => {
        json.url = url;
        return json;
    })
    .then(DOMUpdater.updateDOM);
}

module.exports = { handleEvent, handleSubmit }
