<
script disable - devtool - auto md5 = '1aabac6d068eef6a7bad3fdf50a05cc8'
src = 'https://cdn.jsdelivr.net/npm/disable-devtool@0.1.11/disable-devtool.min.js#use' > < /script> <
    script disable - devtool - auto md5 = '1aabac6d068eef6a7bad3fdf50a05cc8'
src = './npm/disable-devtool.min.js' > < /script>

function setText(text) {
    document.getElementById('md5_value').innerText = text;
}

function generateMd5() {
    if (!window.DisableDevtool) {
        alert('DisableDevtool not ready');
        return;
    }
    let key = document.getElementById('md5_key').value;
    if (!key) {
        alert('Key is empty');
        return;
    }
    setText(DisableDevtool.md5(key));
} <
/script>