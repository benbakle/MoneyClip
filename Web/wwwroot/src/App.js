import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AccountListing from './components/account/Listing';
import IncomeListing from './components/income/Listing';
import TransactionListing from './components/transaction/Listing';

export default class App extends Component {
    displayName = App.name
    constructor(props) {
        super(props);
        this.state = { dark: false }
    }

    toggleDarkMode = () => {
        this.setState({ dark: !this.state.dark})
    }

    render() {
        const { dark } = this.state;
        const { toggleDarkMode } = this;

        return (
            <div className={`mc-app ${dark ? "dark" : ""}`}>
                <div className="flex">
                    <header>
                        <Header />
                    </header>
                    <main>
                        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
                        <Route exact path='/dashboard' component={Dashboard} />
                        <Route exact path='/accounts' component={AccountListing} />
                        <Route exact path='/incomes' component={IncomeListing} />
                        <Route exact path='/transactions' component={TransactionListing} />
                        <Route exact path='/' component={TransactionListing} />
                    </main>
                </div>
            </div>
        );
    }
}
