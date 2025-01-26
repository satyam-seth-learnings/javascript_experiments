function accordionClickHandler(i) {
  const currentOpenedAccordion = document.querySelector(".accordion--open");
  currentOpenedAccordion?.classList.remove("accordion--open");
  const clickedAccordion = document.querySelectorAll(".accordion__item")[i];
  clickedAccordion.classList.toggle("accordion--open");
}

window.onload = () => {
  const accordionItem = document.querySelectorAll(".accordion__head");
  accordionItem.forEach((item, i) => {
    item.addEventListener("click", () => {
      accordionClickHandler(i);
    });
  });
};
