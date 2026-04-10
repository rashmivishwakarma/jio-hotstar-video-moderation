import { useEffect, useState, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import ViolationsSidebar from "./ViolationSidebar";
import ViolationDetails from "./ViolationDetails";
import ViolationAction  from './ViolationAction';
import Timeline from "./Timeline";
import { transformTags } from "../../../utilities/transform";
import { fetchModerationData } from '../../../services/api';
import { timeToSeconds } from "../../../utilities/transform";
import { useNavigate, useLocation } from 'react-router-dom';

export default function VideoModerationManagement() {

  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [segments, setSegments] = useState([]);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoId, setVideoId] = useState('');
  const playerRef = useRef();

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pause();
    } else {
      playerRef.current?.play();
    }

    setIsPlaying(!isPlaying); // Switch the state
  };

  useEffect(() => {
    loadModeration();
  }, []);

  const loadModeration = async () => {
    try {
      const res = await fetchModerationData(location.state?.videoId);
      setDuration(res.video_length);
      setSegments(transformTags(res.tags));

      setVideoId(res.video_id)
    } finally {
      setLoading(false);
    }
  };

  const handleSelection = (segment) => {
    setSelectedSegment(segment); // This fixes the ReferenceError
    
    // Convert "00:10" to seconds if it's a string
    const time = typeof segment.start_time === 'string' 
      ? timeToSeconds(segment.start_time) 
      : segment.start_time;
      
    playerRef.current.seekTo(time);
    playerRef.current.pause();
  };

  const handleSeek = (time) => {
    setCurrentTime(time);
    playerRef.current.seekTo(time);
    playerRef.current.pause();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="row h-100">
      <div className="col-12 mb-3 back-to-library">
        <div className="d-flex align-items-center">
          <div onClick={() => navigate(-1)}>
            <img src="../../src/assets/back-icon.png" className="back-icon" />
            Back
          </div>
        </div>
      </div>
      <div className="col-3 h-100 left-container">
        <div className="overflow-auto side-section top-section">
          <ViolationsSidebar
            segments={segments} 
            activeId={selectedSegment?.id} 
            onSelect={handleSelection} />
        </div>
      </div>
      <div className="col-6 h-100">
        <div className="h-50">
          <VideoPlayer
            videoId={videoId} 
            ref={playerRef}
            onTimeUpdate={setCurrentTime}
            onDuration={setDuration} />
          <div className="controls">
            <div className="d-flex justify-content-center align-item-center">
              <button onClick={() => playerRef.current.skip(-5)}>⏮</button>
              <button onClick={() => playerRef.current.skip(5)}>⏭</button>
              <button onClick={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
            </div>
          </div>
          <Timeline
            segments={segments}
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            onMarkerClick={(time) => {
              // Find the segment object to update the Right Section
              const segment = segments.find(s => timeToSeconds(s.start_time) === time);
              if (segment) setSelectedSegment(segment); 
              handleSeek(time);
            }} />
          </div>
      </div>
      <div className="col-3 h-100 right-container">
          <div className="mb-3 top-section">
            <ViolationDetails
              selectedSegment={selectedSegment} />
          </div>
          <div className="bottom-section">
            <ViolationAction 
              selectedSegment={selectedSegment} />
          </div>
      </div>
    </div>
  );
}
