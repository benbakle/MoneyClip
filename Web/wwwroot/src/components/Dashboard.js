import React from 'react';
import Balance from './Balance';
import Listing from './layouts/Listing';
import Loading from './Loading';
import Card50 from './layouts/Card50';
import Crud from './layouts/Crud';
import Card100 from './layouts/Card100';
import TransactionView from './transaction/View.js';
import TransactionCreate from './transaction/Create';
import TransactionUpdate from './transaction/Update';

import IncomeView from './income/View.js';
import IncomeCreate from './income/Create';
import IncomeUpdate from './income/Update';

import AccountView from './account/View.js';
import AccountCreate from './account/Create';
import AccountUpdate from './account/Update';

export default class Dashcard extends React.Component {
    render() {
        return (
            <div className="grid">
                <div className="mc-container">
                    <div className="flex-row">
                        <Card50 content={<Balance />} className="balance" />
                        <Card50 content={displayAccounts()} />
                        <Card50 content={displayIncomes()} />
                        <Card50 content={displayTransactions()} />
                        <Card50 content={
                            <Crud view={<TransactionView />} create={<TransactionCreate />} update={<TransactionUpdate />} type="transactions" orderby="date" />} />
                        <Card50 content={
                            <Crud view={<IncomeView />} create={<IncomeCreate />} update={<IncomeUpdate />} type="incomes" orderby="description" />} />
                        <Card50 content={
                            <Crud view={<AccountView />} create={<AccountCreate />} update={<AccountUpdate />} type="accounts" orderby="name" />} />
                        <Card50 content={<Loading />} />
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
        </React.Fragment>
    )
}

