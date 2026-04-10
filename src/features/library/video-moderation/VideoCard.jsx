import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const [play, setPlay] = useState(false);

  const thumbnail = `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`;

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleNavigation = (videoId) => {
    navigate('/library/videomoderation/clip', {
      state: { videoId: videoId }
    })
  }

  return (
    <div 
      className="video-card" 
      onClick={() => handleNavigation(video.video_id)}>
      {!play ? (
        <div className="thumb" onClick={() => setPlay(false)}>
          <img src={thumbnail} alt="" />
          <span className="duration">{formatTime(video.video_length)}</span>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${video.video_id}?autoplay=1`}
          title="video"
          allow="autoplay"
        />
      )}
      <div className="d-flex video-details">
        <div>{video.video_title || 'Video Title'}</div>
        <div className="status pending">
          <span><img src={`${import.meta.env.VITE_WEB_URL}src/assets/pending.png`} /></span>Pending</div>
      </div>
    </div>
  );
};

export default VideoCard;