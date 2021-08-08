const video = document.getElementById('video');
const startbtn = document.getElementById('start');
const stopbtn = document.getElementById('stop');
const getPicInPic = document.getElementById('getPicInPic');

var shared = false;
var started = false;
// var shareable = true;
async function selectMediaStream() {
    try {
        mediaStream = await navigator.mediaDevices.getDisplayMedia();
        video.srcObject = mediaStream;
        shared = true;
        shareable=false;
        video.onloadedmetadata = () => {
            video.play();
        }
    } catch (error) {
        console.log("error", error)
    }
}

startbtn.addEventListener('click', async () => {
    if (shared == true) {
        started = true;
        // Disable button
        startbtn.disabled = true;
        // start picture in picture
        await video.requestPictureInPicture();
        // Reset Button
        startbtn.disabled = false;
    }
    else
        alert("First Select Get Picture in Picture")
});
function stopStreamedVideo(videoElem) {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track) {
        track.stop();
    });

    videoElem.srcObject = null;
}
stopbtn.addEventListener('click', function () {
    if (started == true) {
        document.exitPictureInPicture();
        shared = false;
        started = false;
        stopStreamedVideo(video);
        shareable = true;
    }
    else {
        alert("First Start then Stop :')")
    }
})
// On clicking getpicinpic
getPicInPic.addEventListener('click', function () {
    if(video.srcObject!=null)
    {
        var confirmation = confirm("Previous Screen shared will be closed");
        if(confirmation==true)
        {
            stopStreamedVideo(video);
        }
    }
    else
    {
        selectMediaStream();
    }
});