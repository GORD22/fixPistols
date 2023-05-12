const cards = document.querySelectorAll(".category__list > .category__item");
for (let i = 0; i < cards.length; i++) {
    cards[i].style.zIndex = 20 - i;
}