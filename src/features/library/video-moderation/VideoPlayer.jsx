import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const VideoPlayer = forwardRef(({ videoId, onTimeUpdate, onDuration }, ref) => {
const playerRef   = useRef(null);
const intervalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    seekTo: (time) => {
      if (playerRef.current && playerRef.current.seekTo) {
        playerRef.current.seekTo(time, true);
      }
    },
    play: () => playerRef.current?.playVideo?.(),
    pause: () => playerRef.current?.pauseVideo?.(),
    skip: (sec) => {
      if (!playerRef.current) return;
      const current = playerRef.current.getCurrentTime?.() || 0;
      playerRef.current.seekTo(current + sec, true);
    }
}));

  useEffect(() => {
    const init = () => {
      playerRef.current = new window.YT.Player("yt", {
        videoId: videoId,
        width  : "100%",
        height : "100%",
        events : {
          onReady: (e) => {
            onDuration(e.target.getDuration());
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              intervalRef.current = setInterval(() => {
                onTimeUpdate(e.target.getCurrentTime());
              }, 100);
            } else {
              clearInterval(intervalRef.current);
            }
          }
        }
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = init;
    } else {
      init();
    }

    return () => clearInterval(intervalRef.current);
  }, []);

  return <div id="yt" className="ratio ratio-16x9" style={{width:"100%"}} />;
});

export default VideoPlayer;
