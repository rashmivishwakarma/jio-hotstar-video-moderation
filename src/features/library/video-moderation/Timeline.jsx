import React from "react";

const format = (s) => {
  const m = Math.floor(s/60);
  const sec = Math.floor(s%60);
  return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
};

const getColor = (category) => {
  const colors = ["#ff4d4f","#faad14","#52c41a","#1890ff","#722ed1","#eb2f96"];
  let hash = 0;
  for (let i=0;i<category.length;i++){
    hash = category.charCodeAt(i)+((hash<<5)-hash);
  }
  return colors[Math.abs(hash)%colors.length];
};

export default function Timeline({ segments, currentTime, duration, onSeek }) {

  const grouped = segments.reduce((acc, seg) => {
    if (!acc[seg.category]) acc[seg.category] = [];
    acc[seg.category].push(seg);
    return acc;
  }, {});

  return (
    <div className="timeline">

      <div className="ruler" onClick={(e)=>{
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX-rect.left)/rect.width;

        onSeek(percent*duration);
      }}>
        {
          Array.from({length: duration}, (_,i)=>(
            <div key={i} className="tick" style={{left:`${(i/duration)*100}%`}}>
              {i%10===0 && <span>{format(i)}</span>}
            </div>
          ))
        }
      </div>

      <div className="tracks">
        {Object.entries(grouped).map(([cat,segs])=>(
          <div key={cat} className="track-row">
            <div className="label">{cat}</div>
            <div className="bar">
              {segs.map(s=>{
                const l=(s.start/duration)*100;
                const w=((s.end-s.start)/duration)*100;

                return (
                    <div 
                      key={s.id} 
                      className="seg" 
                      onClick={() => onSeek(s.start)}
                      style={{left:`${l}%`,width:`${w}%`,background:getColor(cat),cursor:'pointer'}} />
                  );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="playhead" style={{left:`${(currentTime/duration)*100}%`}}/>
    </div>
  );
}
