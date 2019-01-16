import React from 'react';

export default class ListingHeader extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="description mc-label">Description</div>
                <div className="balance mc-label">Balance</div>
            </React.Fragment>
        )
    }
}