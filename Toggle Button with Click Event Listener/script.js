window.onload = () => {
    document.getElementById('slider-checkbox')
        .addEventListener('click', () => {
            console.log('Clicked on slider');
            document.body.classList.toggle('light');
        });
}