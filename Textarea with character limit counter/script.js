window.onload = () => {
    const wrapper = document.querySelector('.wrapper');
    const textarea = document.querySelector('textarea#msg');
    const counter = document.querySelector('.counter');
    const maxLength = textarea.getAttribute('maxlength');

    // add focus event listener for show outline
    textarea.addEventListener('focus', () => {
        wrapper.classList.add('outlined');
    });

    // add blur event listener for hide outline
    textarea.addEventListener('blur', () => {
        wrapper.classList.remove('outlined');
    });

    // add input event listener for updating character limit counter
    textarea.addEventListener('input', (e) => {
        counter.innerText = `${e.target.value.length}/${maxLength}`
    });
}