function appendSvg() {
    const container = document.querySelector('.container');
    const svgObj = document.createElement('object');
    svgObj.id = 'star-svg';
    svgObj.setAttribute('data', 'star.svg');
    container.appendChild(svgObj);
}

function getSvgPathElement() {
    const svgElement = document.getElementById('star-svg').contentDocument;
    const svgPath = svgElement.querySelector('path');
    console.log('svgElement', svgElement);
    console.log('svgPath', svgPath);
    return svgPath;
};

onload = () => {
    appendSvg();

    const changeFillButton = document.getElementById('change-fill');
    const changeStrokeButton = document.getElementById('change-stroke');

    changeFillButton.addEventListener('click', () => {
        const svgPath = getSvgPathElement()
        svgPath.setAttribute('fill', 'gray')
    })

    changeStrokeButton.addEventListener('click', () => {
        const svgPath = getSvgPathElement()
        svgPath.setAttribute('stroke', 'green')
    })
}