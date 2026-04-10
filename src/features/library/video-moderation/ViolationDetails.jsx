import { secondsToTime } from '../../../utilities/transform';

const ViolationDetails = ({ selectedSegment }) => {

  if (!selectedSegment) {
    return <div className="text-muted">Select a violation to see details.</div>;
  }

  return (
    <div>
      <div className="time-range mb-3">
        <span>{secondsToTime(selectedSegment.start)} - {secondsToTime(selectedSegment.end)}</span>
      </div>
      <div className='mb-4'>
        <h6>Transcript</h6>
        {/* <p className='description'>{selectedSegment.category}</p> */}
        {
          selectedSegment.transcript !== "" ? (
            <p className="violation-description">{selectedSegment.transcript}</p>
          ) : <p className="violation-description light-text">Transcript details will be coming soon!</p>
        }
      </div>
      <div>  
        <h6>Scene Description</h6>
        {
          selectedSegment.scene_description !== "" ? (
            <p className="violation-description">{selectedSegment.scene_description}</p>
          ) : <p className="violation-description light-text">Scene Description details will be coming soon!</p>
        }        
      </div>
    </div>
  );
};

export default ViolationDetails;