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
                        <Card100 content={displayIncome()} />
                    </div>
                </div>
            </div>
        )
    }
}

function displayIncome() {
    return (
        <React.Fragment>
            <div className="title">Incomes: </div>
            <div className="incomes">
                <div className="income">
                    <div className="name mc-label">Name</div>
                    <div className="descroption mc-label">Description</div>
                </div>
            </div>
            <ListingLayout view={<View />} type="incomes" orderby="description" />
        </React.Fragment>
        //<ListingLayout view={<Update />} type="incomes" orderby="description" />
    )
}