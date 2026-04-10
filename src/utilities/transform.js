export function timeToSeconds(t){
  const [m,s]=t.split(":").map(Number);
  return m*60+s;
}

export function secondsToTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  
  // padStart ensures we always have two digits (e.g., 05 instead of 5)
  const minutes = String(m).padStart(2, '0');
  const seconds = String(s).padStart(2, '0');
  
  return `${minutes}:${seconds}`;
}

export function transformTags(tags){
  const out=[];
  Object.entries(tags).forEach(([c,arr])=>{
    arr.forEach((i,idx)=>{
      out.push({
        id:c+idx,
        category:c,
        start:timeToSeconds(i.start_time),
        end:timeToSeconds(i.end_time),
        reason:i.reason,
        start_time:i.start_time,
        end_time: i.end_time,
        transcript: 'transcript' in i ? i.transcript : '',
        scene_description: 'scene_description' in i ? i.scene_description : ''
      });
    });
  });
  return out;
}

export const consolidateTags = (data) => {
  const grouped = data.reduce((acc, item) => {
    // Create a unique key based on the three props that must match
    const key = `${item.start}-${item.end}`;

    if (!acc[key]) {
      // If this combination hasn't been seen, create the base object
      // We wrap category in an array immediately
      acc[key] = {
        start: item.start,
        end: item.end,
        id: item.id,
        reason: item.reason,
        category: [item.category] 
      };
    } else {
      // If it exists, check if the category is already in the array
      // (prevents duplicates if the input data has them)
      if (!acc[key].category.includes(item.category)) {
        acc[key].category.push(item.category);
      }
    }

    return acc;
  }, {});

  // Convert the object back into a flat array
  return Object.values(grouped);
};