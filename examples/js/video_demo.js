var selectList = document.getElementById('videoFile');

selectList.addEventListener('change', changeVideoSource);

function changeVideoSource() {
    var selectedVideoFile = selectList.value;
    console.log("selected video file:", selectedVideoFile);
    var localVideo = document.getElementById("localVideo");
    var source = document.createElement('source');
    source.setAttribute('src', selectedVideoFile);
    localVideo.appendChild(source);
    localVideo.load();
}