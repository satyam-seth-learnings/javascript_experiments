document.querySelector('button').addEventListener('click', function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://picsum.photos/1000');
    xhr.responseType = 'blob';

    xhr.onload = function () {
        if (xhr.status === 200) {
            document.querySelector('.img-container').innerHTML = "";
            document.querySelector('.loading').classList.remove('show');
            document.querySelector('.progress-bar').style.width = '0%';
            const blob = xhr.response;
            const image = new Image();
            image.src = URL.createObjectURL(blob);
            document.querySelector('.img-container').appendChild(image);
        }
    }

    xhr.onprogress = (e) => {
        if (e.lengthComputable) {
            const percentage = e.loaded / e.total * 100;
            document.querySelector('.loading').classList.add('show');
            document.querySelector('.progress-bar').style.width = `${percentage}%`;
            document.querySelector('.percentage').innerHTML = `${percentage} %`;
            document.querySelector('.size').innerHTML = `${e.loaded} of ${e.total * 100} bytes`;
        }
    }
    xhr.send();
});