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
