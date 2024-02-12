window.onload = () => {
    const converter = new showdown.Converter();
    const markdownTextarea = document.getElementById("markdown-input")
    const htmlPara = document.getElementById("html-output");

    markdownTextarea.addEventListener('input', (e) => {
        const htmlContent = converter.makeHtml(e.target.value);
        htmlPara.innerText = htmlContent;
    });
}
