import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AccountListing from './components/account/Listing';
import IncomeListing from './components/income/Listing';
import TransactionListing from './components/transaction/Listing';
import TransactionListingWip from './components/transaction/Listing_wip';
import AccountBalances from './components/AccountBalances';
import Account from './services/Account';
import Transactions from './services/Transactions';


export default class App extends Component {
    displayName = App.name
    constructor(props) {
        super(props);
        this.state = { dark: true }
    }

    componentDidMount() {
        Account.init();
        Transactions.init();
    }

    toggleDarkMode = () => {
        this.setState({ dark: !this.state.dark })
    }

    render() {
        const { dark } = this.state;
        //const { toggleDarkMode } = this;

        return (
            <div className={`mc-app ${dark ? "dark" : ""}`}>
                <header>
                    {
                        //<button className="trigger">
                        //    <i className="fas fa-chevron-circle-down"></i>
                        //</button>
                    }
                    <Header />
                </header>
                <main>
                    <div className="grid">
                        <div className="flex-row">
                            {
                                //<div className="col-100">
                                //    <button className="button" onClick={toggleDarkMode}>{dark ? "gimmee vanilla" : "gimmee chocolate"}</button>
                                //</div>
                            }
                            <div className="col-30">
                                <AccountBalances />
                            </div>
                            <div className="col-70">
                                <Route exact path='/dashboard' component={Dashboard} />
                                <Route exact path='/accounts' component={AccountListing} />
                                <Route exact path='/incomes' component={IncomeListing} />
                                <Route exact path='/transactions' component={TransactionListing} />
                                <Route exact path='/transactions-wip' component={TransactionListingWip} />
                                <Route exact path='/' component={TransactionListing} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
