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
                        <div className="title">Incomes: </div>
                        <div className="incomes">
                            <div className="income">
                                <div className="name mc-label">Name</div>
                                <div className="descroption mc-label">Description</div>
                            </div>
                        </div>
                        <ListingLayout view={<View />} type="incomes" orderby="description" />
                        <ListingLayout view={<Update />} type="incomes" orderby="description" />
                    </div>
                </div>
            </div>
        )
    }
}