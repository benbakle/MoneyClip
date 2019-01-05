import React from 'react';
import Balance from './Balance';
import Listing from './layouts/Listing';
import AccountView from './account/View.js';
import IncomeView from './income/View.js';
import TransactionView from './transaction/View.js';
import Loading from './Loading';
import Card50 from './layouts/Card50';


export default class Dashcard extends React.Component {

    render() {
        return (
            <div className="grid">
                <div className="mc-container">
                    <div className="flex-row">
                        <Card50 content={<Balance />} className="balance"/>
                        <Card50 content={displayAccounts()} />
                        <Card50 content={displayIncomes()} />
                        <Card50 content={displayTransactions()} />
                    </div>
                </div>
            </div>
        );
    }
}

function displayAccounts() {
    return (
        <React.Fragment>
            <div className="title">Accounts: </div>
            <div className="accounts">
                <div className="account">
                    <div className="description mc-label">Description</div>
                    <div className="balance mc-label">Balance</div>
                </div>
            </div>
            <Listing view={<AccountView />} type="accounts" orderby="name" />
        </React.Fragment>
    )
}

function displayIncomes() {
    return (
        <React.Fragment>
            <div className="title">Incomes: </div>
            <div className="incomes">
                <div className="income">
                    <div className="name mc-label">Name</div>
                    <div className="amount mc-label">Amount</div>
                </div>
            </div>
            <Listing view={<IncomeView />} type="incomes" orderby="description" />
        </React.Fragment>
    )
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
            <Listing view={<TransactionView />} type="transactions" orderby="date" />

            <Loading />
        </React.Fragment>
    )
}

