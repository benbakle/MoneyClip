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
                        <div className="title">Accounts: </div>
                        <div className="accounts">
                            <div className="account">
                                <div className="description mc-label">Description</div>
                                <div className="balance mc-label">Balance</div>
                            </div>
                        </div>
                        <ListingLayout view={<View />} type="accounts" orderby="name" />
                        <ListingLayout view={<Update />} type="accounts" orderby="name" />
                    </div>
                </div>
            </div>
        )
    }
}