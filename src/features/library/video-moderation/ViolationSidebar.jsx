import { useEffect } from 'react';
import { secondsToTime, consolidateTags } from '../../../utilities/transform';

const ViolationSidebar = ({ segments, activeId, onSelect }) => {
    // default first selection to show right side details
    useEffect(() => {
        onSelect(segments[0]);
    }, []);

    // const updatedSegments = consolidateTags(segments);
    
    return (
        <div className="markings-sidebar">
        {/* Header Section */}
        <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0 fs-6">Violations ({segments.length})</h5>
            </div>
            
            {/* Legend / Status indicators */}
            {/* <div className="d-flex gap-2 mb-3">
            <span className="tiny-label"><span className="dot bg-danger"></span> Critical</span>
            <span className="tiny-label"><span className="dot bg-warning"></span> Medium</span>
            <span className="tiny-label"><span className="dot bg-info"></span> Low</span>
            </div> */}

            {/* Group By Filter (Visual only for now) */}
            {/* <div className="input-group input-group-sm mb-3">
            <span className="input-group-text bg-dark border-secondary text-white">
                <i className="bi bi-filter"></i>
            </span>
            <select className="form-select bg-dark border-secondary text-white shadow-none">
                <option>Group By: Timestamp</option>
                <option>Group By: Category</option>
            </select>
            </div> */}
        </div>

        {/* Scrollable List */}
        <div className="marking-items-container">
            {segments.map((item, index) => {
            const isActive = activeId === item.id || activeId === index;
            return (
                <div 
                key={item.id || index}
                onClick={() => onSelect(item)}
                className={`marking-card p-2 mb-2 rounded border ${isActive ? 'border-primary bg-active' : 'border-secondary bg-transparent'}`}
                style={{ cursor: 'pointer' }}
                >
                <div className="d-flex justify-content-between small mb-1">
                    <span className="text-muted">{secondsToTime(item.start)} - {secondsToTime(item.end)}</span>
                    <span className="text-warning">● Pending</span>
                </div>
                
                <p className="small mb-2 fw-semibold text-truncate" style={{ maxWidth: '100%' }}>
                    {item.reason || "Incident Detected"}
                </p>

                <div className="d-flex flex-wrap gap-1">
                    {
                    Array.isArray(item.category) ? (
                        item.category.map((cat, index) => (
                            <span 
                                key={`${cat}-${index}`} 
                                className={`custom-ellipsis badge rounded-pill border border-white bg-transparent badge-outline-${cat.toLowerCase()}`}>
                                    {cat}
                            </span>
                        ))
                        ) : (
                        /* Fallback for strings or missing data */
                        <span className="custom-ellipsis badge rounded-pill border border-white bg-transparent">{item.category || "No Category"}</span>
                    )}
                </div>
                
                <div className="mt-2 pt-2 border-top border-secondary opacity-50">
                    <small style={{fontSize: '10px'}}>AI Accuracy: {item.accuracy}</small>
                </div>
                </div>
            );
            })}
        </div>
        </div>
    );
};

export default ViolationSidebar;