function downloadInvoice() {
    const request = new XMLHttpRequest();
    const fileName = 'satyam-seth.jpg';
    request.open('GET', 'https://avatars.githubusercontent.com/u/63374020?v=4', true);
    request.responseType = 'blob';

    request.onload = () => {
        if (request.status === 200) {
            console.log(request)
            const blob = request.response;
            const downloadLink = window.document.createElement('a');
            const contentTypeHeader = request.getResponseHeader('Content-Type');
            downloadLink.href = window.URL.createObjectURL(
                new Blob(
                    [blob],
                    { type: contentTypeHeader },
                ),
            );
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };
    request.send();
}

window.onload = () => {
    document.querySelector('button').addEventListener('click', downloadInvoice)
}