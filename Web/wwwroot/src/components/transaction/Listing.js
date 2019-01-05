import React from 'react';
import View from './View';
import Update from './Update';
import ListingLayout from '../layouts/Listing';

export default class Listing extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="content">
                    <div className="mc-container">
                        <div className="title">Transactions: </div>
                        <div className="transactions">
                            <div className="transaction">
                                <div className="date mc-label">Date</div>
                                <div className="description mc-label">Description</div>
                                <div className="amount mc-label">Amount</div>
                            </div>
                        </div>
                        <ListingLayout view={<View />} type="transactions" orderby="date" />
                        <ListingLayout view={<Update />} type="transactions" orderby="date" />
                    </div>
                </div>
            </div>
        )
    }
}