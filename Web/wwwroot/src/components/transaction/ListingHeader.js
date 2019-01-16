import React from 'react';

export default class ListingHeader extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="date mc-label">Date</div>
                <div className="description mc-label">Description</div>
                <div className="amount mc-label">Amount</div>
            </React.Fragment>
        )
    }
}