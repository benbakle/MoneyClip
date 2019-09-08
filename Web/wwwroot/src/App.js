import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AccountListing from './components/account/Listing';
import IncomeListing from './components/income/Listing';
import TransactionListing from './components/transaction/Listing';
import Balance from './components/Balance';

export default class App extends Component {
    displayName = App.name
    constructor(props) {
        super(props);
        this.state = { dark: true }
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
                            <div className="col-70">
                                <Route exact path='/dashboard' component={Dashboard} />
                                <Route exact path='/accounts' component={AccountListing} />
                                <Route exact path='/incomes' component={IncomeListing} />
                                <Route exact path='/transactions' component={TransactionListing} />
                                <Route exact path='/' component={TransactionListing} />
                            </div>
                            <div className="col-30">
                                <Balance />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
