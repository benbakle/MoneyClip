import React from 'react';
import Balance from './Balance';
import Listing from './layouts/Listing';
import AccountView from './account/View.js';
import IncomeView from './income/View.js';
import Loading from './Loading';


export default class Dashboard extends React.Component {

    render() {
        return (
            <div className="dashboard">
                <div className="board">
                    <div className="mc-container">
                        <div className="flex">
                            <div className="title">Current Balance: </div>
                            <Balance />
                        </div>
                        <div className="title">Accounts: </div>
                        <Listing view={<AccountView />} type="accounts" orderby="name" />

                        <div className="title">Incomes: </div>
                        <Listing view={<IncomeView />} type="incomes" orderby="description" />
                        <Loading />
                    </div>
                </div>
            </div>
        );
    }
}

