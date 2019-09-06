import React from 'react';

export default class ListingHeader extends React.Component {
    render() {
        return (
            <>
                <div className="cell name mc-label">Description</div>
                <div className="cell type mc-label">Type</div>
                <div className="cell balance mc-label">Balance</div>
                <div className="cell crud mc-label"></div>
            </>
        )
    }
}