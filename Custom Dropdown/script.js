for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function () {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.select').querySelector('.select__trigger span').textContent = this.textContent;
        }
    })
}


// If single select
// document.querySelector('.select-wrapper').addEventListener('click', function () {
//     this.querySelector('.select').classList.toggle('open');
// })

// window.addEventListener('click', function (e) {
//     const select = document.querySelector('.select')
//     if (!select.contains(e.target)) {
//         select.classList.remove('open');
//     }
// });

// If multiple select on same page
for (const dropdown of document.querySelectorAll(".select-wrapper")) {
    dropdown.addEventListener('click', function () {
        this.querySelector('.select').classList.toggle('open');
    })
}

window.addEventListener('click', function (e) {
    for (const select of document.querySelectorAll('.select')) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    }
});
