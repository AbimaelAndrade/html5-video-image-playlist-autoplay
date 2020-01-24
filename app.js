(function () {
  let medias = [
    'http://thenewcode.com/assets/videos/lake.mp4',
    'http://thenewcode.com/assets/images/vid-mountain.jpg',
    'http://thenewcode.com/assets/videos/glacier.mp4',
  ],
  videos,
  currentVideoIndex = 0,
  currentVideo = null,
  imageDuration = 3000;
  
  const onLoadPlaylist = () => {
    playerContainer = document.getElementById('player-container');

    videos = medias.map( item => {
      let video = document.createElement('video');
      video.preload = true;
      video.autoplay = true;
      video.muted = true;
      video.classList.add('player');

      if(!isImage(item))
      {
        video.src = item;
        video.load();
      }else {
        video.poster = item;
        video.src = "#";
        video.load();
      }

      video.onended = handleEndedVideo;
      playerContainer.appendChild(video);

      return video;
    });

    window.videos = videos;

    play();
  };
  
  const isImage = (url) => {
    return /.\.jpg/.test(url);
  }

  const nextVideo = () => {
    currentVideoIndex += 1;
    currentVideoIndex = (currentVideoIndex > videos.length - 1) ? 0 : currentVideoIndex;
    let oldVideo = currentVideo;
    currentVideo = videos[currentVideoIndex];

    if(!currentVideo.poster)
      {
        oldVideo.classList.remove('player-show');
        currentVideo.classList.add('player-show');
        oldVideo.pause();
        currentVideo.play();
      }else {
        oldVideo.classList.remove('player-show');
        currentVideo.classList.add('player-show');

        oldVideo.pause();
        setTimeout(nextVideo, imageDuration);
      } 
  }

  const play = () => {
    currentVideo = videos[currentVideoIndex];
    currentVideo.classList.add('player-show');
    currentVideo.currentTime = 0;
    currentVideo.play();
  }

  const handleEndedVideo = () => {
    nextVideo();
  }
  
    onLoadPlaylist();
})();