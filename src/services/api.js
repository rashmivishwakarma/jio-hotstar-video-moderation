import items from "../assets/dummy-data/sample.json";
import bengali from "../assets/dummy-data/Bengali_Clip-Chapri_tags.json";
import jhenabad from "../assets/dummy-data/Jehanabad-Webseries_Clip_Hindi_tags.json";
import nazar from "../assets/dummy-data/Nazar-Star_Plus_tags.json";
import shaitan from "../assets/dummy-data/Shaitan_Promo-Telugu_tags.json";


export async function fetchModerationData(requestedId){

  const matchedVideo = items.data.find((item) => item.video_id === requestedId);
  if (matchedVideo)
    return new Promise(res=>setTimeout(()=>res(matchedVideo),500));

  return new Promise(res=>setTimeout(()=>res(null),500));
}

export async function getAllVideos(){
  return new Promise(res=>setTimeout(()=>res([shaitan,jhenabad, bengali]),500));
}