import React from 'react';
import View from './View';
import ListingLayout from '../layouts/Listing';
//import History from '../../services/History';
import Card100 from '../layouts/Card100';

export default class Listing extends React.Component {
    render() {
        return (
            <div className="grid">
                <div className="mc-container">
                    <div className="flex-row">
                        <Card100 content={displayAccount()} />
                    </div>
                </div>
            </div>
        )
    }
}
function displayAccount() {
    return (
        <React.Fragment>
            <div className="title">Accounts: </div>
            <div className="accounts">
                <div className="account">
                    <div className="description mc-label">Description</div>
                    <div className="balance mc-label">Balance</div>
                </div>
            </div>
            <ListingLayout view={<View />} type="accounts" orderby="name" />
        </React.Fragment>
        //<ListingLayout view={<Update callback={() => { History.push("/incomes") }} />} type="accounts" orderby="name" />
    )
}