import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AccountListing from './components/account/Listing';
import IncomeListing from './components/income/Listing';
import TransactionListing from './components/transaction/Listing';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <div className="mc-app">
                <div className="flex">
                    <header>
                        <Header />
                    </header>
                    <main>
                        <Route exact path='/dashboard' component={Dashboard} />
                        <Route exact path='/accounts' component={AccountListing} />
                        <Route exact path='/incomes' component={IncomeListing} />
                        <Route exact path='/transactions' component={TransactionListing} />
                        <Route exact path='/' component={TransactionListing} />
                    </main>
                    <footer>
                    </footer>
                </div>
            </div>
        );
    }
}
