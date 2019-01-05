import React from 'react';
import Balance from './Balance';
import Listing from './layouts/Listing';
import AccountView from './account/View.js';


export default class Dashboard extends React.Component {

    render() {
        return (
            <div className="dashboard">
                <div className="board">
                    <div className="mc-container">
                        <div className="flex">
                            <span className="title">Current Balance: </span>
                            <Balance />
                        </div>
                        <Listing view={<AccountView />} type="accounts" orderby="name" />
                    </div>
                </div>
            </div>
        );
    }
}

