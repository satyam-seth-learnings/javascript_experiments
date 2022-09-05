/**
 * this function will return a function which will be called after the given delay
 * 
 * @callback fn - function to be called
 * @param {number} delay - delay in milliseconds
 * @returns wrapped function to be called
 */
const debounce = (fn, delay) => {
    let timer;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
}

/**
 * This function will fetch the images from the API
 * and will display the images 
 * 
 * @param {string} topic - topic to search for images
 * @param {string} imgElementSelector - selector for the image element
 */
async function showImageByTopic(topic, imgElementSelector) {

    // fetch the images from the API
    console.log(`Making api call for topic "${topic}"`)
    const response = await fetch(`https://source.unsplash.com/1600x900/?${topic}`)

    // get the image url from the response and update the image element
    console.log(`Showing image for topic "${topic}"`)
    document.querySelector(imgElementSelector).src = response.url;
}

window.onload = () => {
    // With Debouncing Example
    /**
     * on keypress event, we are calling the showImageByTopic function with debounce
     * add a delay of 500ms to the function call
     * so that the function is not called on every keypress
     * but only after 500ms of last keypress
     * this is called debouncing
     */
    document.getElementById('topic1')
        .addEventListener('keydown', debounce(async (e) => {
            const countContainer = document.querySelector('#with-debouncing .counter span');
            const currentCount = parseInt(countContainer.innerText);
            countContainer.innerText = currentCount + 1;

            await showImageByTopic(e.target.value, '#with-debouncing img');
        }, 500));

    // on blur event, we are resetting the counter, image and input value
    document.getElementById('topic1').addEventListener('blur', (e) => {
        e.target.value = "";
        document.querySelector('#with-debouncing img').src = "intro-img.gif";
        document.querySelector('#with-debouncing .counter span').innerText = 0;
    });

    // Without Debouncing Example
    /**
     * on keypress event, we are calling the showImageByTopic function without debounce
     * this will call the function on every keypress
     */
    document.getElementById('topic2')
        .addEventListener('keydown', async (e) => {
            const countContainer = document.querySelector('#without-debouncing .counter span');
            const currentCount = parseInt(countContainer.innerText);
            countContainer.innerText = currentCount + 1;

            await showImageByTopic(e.target.value, '#without-debouncing img');
        });

    // on blur event, we are resetting the counter, image and input value
    document.getElementById('topic2').addEventListener('blur', (e) => {
        e.target.value = "";
        document.querySelector('#without-debouncing img').src = "intro-img.gif";
        document.querySelector('#without-debouncing .counter span').innerText = 0;
    });
}