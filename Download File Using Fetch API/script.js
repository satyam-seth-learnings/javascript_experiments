async function downloadInvoice() {
    const fileName = 'satyam-seth.jpg';
    const request = await fetch('https://avatars.githubusercontent.com/u/63374020?v=4');
    const blob = await request.blob();
    const downloadLink = window.document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(
        new Blob(
            [blob],
        ),
    );
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

window.onload = () => {
    document.querySelector('button').addEventListener('click', downloadInvoice)
}