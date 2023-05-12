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