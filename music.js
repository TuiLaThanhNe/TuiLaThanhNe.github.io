music = ['ido', 'noinaycoanh', 'nguoiamphu', 'duong-toi-cho-em-ve-lofi-ver-buitruonglinh-x-freak-d', 'gap-go-yeu-duong-va-duoc-ben-em', 'nam-doi-ban-tay-kay-tran-official-music-video', 'nhung-ban-lofi-freak-d-mix-ver-1.0', 'the-playah-ballad-soobin-hoang-son-ft-slimv-special-version-1-hour'];

// Thay đổi link ramdom bài hát tại đây
document.querySelector("audio").setAttribute("src", `./love/music/${music[Math.floor(Math.random()*music.length)]}.mp3`);
document.getElementsByTagName("body")[0].insertAdjacentHTML(
    "beforeend",
    "<center><div id='mask'></div></center>"
);