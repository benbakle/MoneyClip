import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AccountView from './components/account/View';
import IncomeView from './components/income/View';
import TransactionView from './components/transaction/View';
import Listing from './components/layouts/Listing';

export default class App extends Component {
    displayName = App.name

    accounts() {
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
                        <Listing view={<AccountView />} type="accounts" orderby="name" />
                    </div>
                </div>
            </div>
        )
    }

    incomes() {
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
                        <Listing view={<IncomeView />} type="incomes" orderby="description" />
                    </div>
                </div>
            </div>
        )
    }

    transactions() {
        return (
            <div className="card">
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
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="flex">
                <header>
                    <Header />
                </header>
                <main>
                    <Route exact path='/dashboard' component={Dashboard} />
                    <Route exact path='/accounts' component={this.accounts} />
                    <Route exact path='/incomes' component={this.incomes} />
                    <Route exact path='/transactions' component={this.transactions} />
                </main>
                <footer>
                </footer>
            </div>
        );
    }
}
