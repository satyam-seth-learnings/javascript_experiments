const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        // if (entry.isIntersecting) observer.unobserve(entry.target);
        console.log("start");
        console.log(entry.target);
        console.log(entry.isIntersecting);
        console.log("end");
    }, {
        threshold: 0.5
    })
})

cards.forEach(card => {
    observer.observe(card);
})
