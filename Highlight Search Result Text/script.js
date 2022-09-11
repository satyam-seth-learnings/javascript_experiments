function searchAndHighlightText(searchText, textHTMLElement) {
    if (searchText !== "") {
        let text = textHTMLElement.innerText;
        let re = new RegExp(searchText, "g"); // search for all instances
        let newText = text.replace(re, `<mark>${searchText}</mark>`);
        textHTMLElement.innerHTML = newText;
    }
}

window.onload = () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchText = form.querySelector('#search').value.trim();
        const textHTMLElement = document.getElementById("text");
        searchAndHighlightText(searchText, textHTMLElement);
        form.reset();
    })
}