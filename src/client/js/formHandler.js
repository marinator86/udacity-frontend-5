function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    const url = document.getElementById('name').value;
    C.checkForName(url);

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        const results = document.getElementById('results');
        
        const resultbox = document.createElement('div');
        const title = document.createElement('div');
        const polarity = document.createElement('div');
        const subjectivity = document.createElement('div');
        const text = document.createElement('div');

        resultbox.classList.add('resultbox');
        title.classList.add('title');
        polarity.classList.add('polarity');
        polarity.classList.add(res.polarity == 'positive' ? 'pos' : 'neg');
        subjectivity.classList.add('subjectivity');
        text.classList.add('text');

        title.textContent = url;
        polarity.textContent = res.polarity;
        subjectivity.textContent = res.subjectivity;
        text.textContent = res.text.substring(0, 1000);

        resultbox.appendChild(title);
        resultbox.appendChild(polarity);
        resultbox.appendChild(subjectivity);
        resultbox.appendChild(text);

        results.appendChild(resultbox);
    });
}

export { handleSubmit }
