import React from 'react';
import View from './View';
import ListingLayout from '../layouts/Listing';
import Card100 from '../layouts/Card100';

export default class Listing extends React.Component {
    render() {
        return (
            <div className="grid">
                <div className="mc-container">
                    <div className="flex-row">
                        <Card100 content={displayTransactions()} />
                    </div>
                </div>
            </div>
        )
    }
}
function displayTransactions() {
    return (
        <React.Fragment>
            <div className="title">Transactions: </div>
            <div className="transactions">
                <div className="transaction">
                    <div className="date mc-label">Date</div>
                    <div className="description mc-label">Description</div>
                    <div className="amount mc-label">Amount</div>
                </div>
            </div>
            <ListingLayout view={<View />} type="transactions" orderby="date" />
        </React.Fragment>
        //<ListingLayout view={<Update />} type="transactions" orderby="date" />
    )
}