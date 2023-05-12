const swiperAbout = new Swiper('.about-section__container > .content', {
    loop: true,

    navigation: {
        nextEl: '.about-section__container-top',
    },
    
});
const swiperActual = swiperCreater('.actual-slider', '.actual-section__container')
const swiperApplication = swiperCreater('.applications-catalog', '.applications-section__container')
const cards = document.querySelectorAll(".category__list > .category__item");
for (let i = 0; i < cards.length; i++) {
    cards[i].style.zIndex = 20 - i;
}



const swiperHero = swiperCreater('.slider', '.slider')
const swiperHits = swiperCreater('.hits-slider', '.hits-section__container')
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js';


function swiperCreater(swiperName, classNamePath) {
    const swiper = new Swiper(swiperName, {
        loop: true,
    
        navigation: {
            nextEl: classNamePath + ' > .btns-block > .btn-next',
            prevEl: classNamePath + ' > .btns-block > .btn-prev',
        },
        
    });

    return swiper;
}
const videoBlocks = document.querySelectorAll('.video-block');
const video = document.querySelectorAll('.video-block__content');
const playBtns = document.querySelectorAll('.play-btn');

for (let i = 0; i < playBtns.length; i++) {
    playBtns[i].addEventListener('click', () => {
        if (video[i].paused) {
            videoBlocks[i].classList.add('video-block_played');
            video[i].play();
            playBtns[i].classList.add('play-btn_played')
        }
    })
}
for (let i = 0; i < video.length; i++) {
    video[i].addEventListener('click', () => {
        if (video[i].play) {
            videoBlocks[i].classList.remove('video-block_played');
            video[i].pause();
            playBtns[i].classList.remove('play-btn_played')
        }
    })
}
