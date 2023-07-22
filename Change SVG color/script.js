onload = () => {
    const mainElement = document.querySelector('main');

    const svgObj = document.createElement('object');
    svgObj.id = 'svg'
    svgObj.setAttribute('data', 'star.svg')

    mainElement.appendChild(svgObj);

    const changeFillButton = document.getElementById('change-fill');
    const changeStrokeButton = document.getElementById('change-stroke');

    changeFillButton.addEventListener('click', () => {
        const svgElement = document.getElementById('svg').contentDocument;
        const svgPath = svgElement.querySelector('path');
        console.log(svgElement);
        console.log(svgPath);
        svgPath.setAttribute('fill', 'gray')
    })

    changeStrokeButton.addEventListener('click', () => {
        const svgElement = document.getElementById('svg').contentDocument;
        const svgPath = svgElement.querySelector('path');
        console.log(svgElement);
        console.log(svgPath);
        svgPath.setAttribute('stroke', 'green')
    })
}