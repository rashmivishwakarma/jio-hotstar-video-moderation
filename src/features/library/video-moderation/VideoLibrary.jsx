import { getAllVideos } from "../../../services/api";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";

export default function VideoLibrary() {

  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {
      loadAllVideos();
    }, []);
  
    const loadAllVideos = async () => {
      try {
        const res = await getAllVideos();
        setList(res);
      } catch {
        setList([])
      } finally{
         setLoading(false);
      }
    };


  return (
    <div className="app list">
      {list.map((video, index) => {
        return (
          <VideoCard
            key={video.video_id || index}
            video={video}
          />
        );
      })}
    </div>
  );
}
