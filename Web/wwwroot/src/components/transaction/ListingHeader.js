import React from 'react';

export default class ListingHeader extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="date cell mc-label">Scheduled Date</div>
                <div className="description cell mc-label">Description</div>
                <div className="number cell  mc-label">Number</div>
                <div className="amount cell mc-label">Amount</div>
                <div className="status mc-label">Clear</div>
                <div className="crud cell mc-label">Edit</div>
            </React.Fragment>
        )
    }
}