const DOMUpdater = require('./DOMUpdater.js');

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    const url = document.getElementById('name').value;

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({url: url})
    })
    .then(res => { 
        const response = res.json();
        response.url = url;
        return response;
    })
    .then(DOMUpdater.updateDOM);
}

export { handleSubmit }
