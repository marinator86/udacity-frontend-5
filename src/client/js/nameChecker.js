function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]
    const contains = names.includes(inputText);
    if(contains) {
        alert("Welcome, Captain!")
    }
    return contains;
}

module.exports = { checkForName }
