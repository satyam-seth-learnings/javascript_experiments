// Custom Event
const demoCustomEvent = new CustomEvent('myCustomEvent', {
    // set extra data
    detail: {
        message: 'I am your custom event'
    }
});



window.onload = () => {
    const mainContainer = document.querySelector('main');
    const status = document.querySelector(".status");

    mainContainer.addEventListener('myCustomEvent', (e) => {
        document.querySelector('h1').classList.add('shake');
        status.classList.add('shake');
        // access custom event detail extra data
        status.innerText = e.detail.message;
    })

    // timer dispatch custom event after 10 seconds
    let timeLeft = 10;
    var countDownTimer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countDownTimer);
            // trigger event
            mainContainer.dispatchEvent(demoCustomEvent);
        } else {
            status.innerText = timeLeft + " seconds remaining";
        }
        timeLeft--;
    }, 1000);
}