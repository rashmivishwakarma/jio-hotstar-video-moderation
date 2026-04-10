const ViolationAction = ({selectedSegment}) => {

    return (
        <div className="violation-action">
            <h6>Actions</h6>
            { selectedSegment ? 
                (
                    <div className="action-list">
                        <div className="action-reason mb-3">{selectedSegment.reason}</div>
                        <div className="action-violation-info">
                            <div className="clip-time mb-1">{selectedSegment.start_time} - {selectedSegment.end_time}</div>
                            <div className="badge rounded-pill border border-white bg-transparent">{selectedSegment.category}</div>
                        </div>
                    </div>
                ) : 
                null
            }
            <div className="all-action-button">
                <button className="btn btn-success flex-grow-1 m-r-10">Keep</button>
                <button className="btn btn-outline-danger flex-grow-1 m-r-10">Remove</button>
                <button className="btn btn-outline-danger flex-grow-1">Escalate</button>
            </div>
        </div>
    )
}

export default ViolationAction;