import React from 'react';
import Balance from './Balance';
import Listing from './layouts/Listing';
import AccountView from './account/View.js';
import IncomeView from './income/View.js';
import TransactionView from './transaction/View.js';
import Loading from './Loading';


export default class Dashcontent extends React.Component {

    render() {
        return (
            <div className="card">
                <div className="content">
                    <div className="mc-container">
                        <div className="flex">
                            <div className="title">Current Balance: </div>
                            <Balance />
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="mc-container">
                        <div className="title">Accounts: </div>
                        <div className="accounts">
                            <div className="account">
                                <div className="description mc-label">Description</div>
                                <div className="balance mc-label">Balance</div>
                            </div>
                        </div>
                        <Listing view={<AccountView />} type="accounts" orderby="name" />
                    </div>
                </div>
                <div className="content">
                    <div className="mc-container">
                        <div className="title">Incomes: </div>
                        <div className="incomes">
                            <div className="income">
                                <div className="name mc-label">Name</div>
                                <div className="amount mc-label">Amount</div>
                            </div>
                        </div>
                        <Listing view={<IncomeView />} type="incomes" orderby="description" />
                    </div>
                </div>
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
                        <Listing view={<TransactionView />} type="transactions" orderby="date" />

                        <Loading />

                    </div>
                </div>
            </div>
        );
    }
}

