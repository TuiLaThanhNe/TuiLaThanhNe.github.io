music = ['loinho', 'noinaycoanh', 'nguoiamphu','nhuanhmo','coem', 'anhsaovabautroi', 'bluetequila', 'bainaychillphet', 'Rapcoustic5', 'the-playah-ballad-soobin-hoang-son-ft-slimv-special-version-1-hour'];

// Thay đổi link ramdom bài hát tại đây
document.querySelector("audio").setAttribute("src", `./love/music/${music[Math.floor(Math.random()*music.length)]}.mp3`);
document.getElementsByTagName("body")[0].insertAdjacentHTML(
    "beforeend",
    "<center><div id='mask'></div></center>"
);