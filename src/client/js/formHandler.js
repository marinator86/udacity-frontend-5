function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    const url = document.getElementById('name').value;
    C.checkForName(url);

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        //document.getElementById('results').innerHTML = res.polarity
    });
}

export { handleSubmit }
