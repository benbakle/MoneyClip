import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AccountListing from './components/account/Listing';
import IncomeListing from './components/income/Listing';
import TransactionListing from './components/transaction/Listing';
import AccountBalance from './components/AccountBalance';
import Balance from './services/Balance';

export default class App extends Component {
    displayName = App.name
    constructor(props) {
        super(props);
        this.state = { dark: true }
    }

    static getDerivedStateFromProps() {
        Balance.init();
        return null;
    }

    toggleDarkMode = () => {
        this.setState({ dark: !this.state.dark })
    }

    render() {
        const { dark } = this.state;
        const { toggleDarkMode } = this;

        return (
            <div className={`mc-app ${dark ? "dark" : ""}`}>
                <header>
                    <div className="mc-container">
                        <Header />
                    </div>
                </header>
                <main>
                    <div className="grid">
                        <div className="flex-row">
                            <div className="col-100">
                                <button className="button" onClick={toggleDarkMode}>{dark ? "gimmee vanilla" : "gimmee chocolate"}</button>
                            </div>
                            <div className="col-30">
                                <div className="balances">
                                    <AccountBalance type="available" title="available cash" icon="plus" active={true} />
                                    <AccountBalance type="checking" title="checking" icon="plus" />
                                    <AccountBalance type="credit" title="credit debt" icon="minus" />
                                    <AccountBalance type="savings" title="savings" icon="plus" />
                                </div>
                            </div>
                            <div className="col-70">
                                <Route exact path='/dashboard' component={Dashboard} />
                                <Route exact path='/accounts' component={AccountListing} />
                                <Route exact path='/incomes' component={IncomeListing} />
                                <Route exact path='/transactions' component={TransactionListing} />
                                <Route exact path='/' component={TransactionListing} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
