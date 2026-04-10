const ViolationAction = ({selectedSegment}) => {


    const handleClick = (action) => {
        let message = "";
        switch (action) {
            case 'keep':
                message = 'The selected content is acceptable.';
                break;

            case 'remove':
                message = 'The selected content is not acceptable and need to remove.';
                break;

            case 'evaluate':
                message = 'The selected content needs further analysis.';
                break;
        }

        alert(message)
    }

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
                <button className="btn btn-success flex-grow-1 m-r-10" onClick={() => handleClick('keep')}>Keep</button>
                <button className="btn btn-outline-danger flex-grow-1 m-r-10" onClick={() => handleClick('remove')}>Remove</button>
                <button className="btn btn-outline-danger flex-grow-1" onClick={() => handleClick('evaluate')}>Evaluate</button>
            </div>
        </div>
    )
}

export default ViolationAction;