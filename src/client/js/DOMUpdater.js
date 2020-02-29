function updateDOM(res) {
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

    title.textContent = res.url;
    polarity.textContent = res.polarity;
    subjectivity.textContent = res.subjectivity;
    text.textContent = res.text.substring(0, 500);

    resultbox.appendChild(title);
    resultbox.appendChild(polarity);
    resultbox.appendChild(subjectivity);
    resultbox.appendChild(text);

    results.appendChild(resultbox);
}

export {
    updateDOM
}