const url = 'video.mp4';
const videoWrapper = document.querySelector('.videoWrapper');
const downloadBtn = document.querySelector('.download');
const abortBtn = document.querySelector('.abort');
const reports = document.querySelector('.reports');

let controller;
let progressAnim;
let animCount = 0;

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', () => {
    controller.abort();
    console.log('Download aborted');
    downloadBtn.classList.remove('hidden');
});

function fetchVideo() {
    controller = new AbortController();
    const signal = controller.signal;
    downloadBtn.classList.add('hidden');
    abortBtn.classList.remove('hidden');
    reports.textContent = 'Video awaiting download...';
    fetch(url, { signal }).then((response) => {
        if (response.status === 200) {
            runAnimation();
            setTimeout(() => console.log('Body used: ', response.bodyUsed), 1);
            return response.blob();
        } else {
            throw new Error('Failed to fetch');
        }
    }).then((myBlob) => {
        const video = document.createElement('video');
        video.setAttribute('controls', '');
        video.src = URL.createObjectURL(myBlob);
        videoWrapper.appendChild(video);

        videoWrapper.classList.remove('hidden');
        abortBtn.classList.add('hidden');
        downloadBtn.classList.add('hidden');

        reports.textContent = 'Video ready to play';
    }).catch((e) => {
        abortBtn.classList.add('hidden');
        downloadBtn.classList.remove('hidden');
        reports.textContent = 'Download error: ' + e.message;
    }).finally(() => {
        clearInterval(progressAnim);
        animCount = 0;
    });
}

function runAnimation() {
    progressAnim = setInterval(() => {
        switch (animCount++ & 3) {
            case 0: reports.textContent = 'Download occuring; waiting for video player to be constructed'; break;
            case 1: reports.textContent = 'Download occuring; waiting for video player to be constructed.'; break;
            case 2: reports.textContent = 'Download occuring; waiting for video player to be constructed..'; break;
            case 3: reports.textContent = 'Download occuring; waiting for video player to be constructed...'; break;
        }
    }, 300);
}
