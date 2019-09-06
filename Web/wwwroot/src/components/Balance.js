import React from 'react';
import Api from '../services/Api';
import Loading from './Loading';
import Money from './Money';

export default class Balance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            accountTotal: null,
            transactionTotal: 0,
            incomeTotal: 0,
            currentBalance: 0
        }

        this.loadAccountTotal = this.loadAccountTotal.bind(this);
        this.loadTransactionTotal = this.loadTransactionTotal.bind(this);
        this.loadIncomeTotal = this.loadIncomeTotal.bind(this);
        this.calculateBalance = this.calculateBalance.bind(this);

        Api.fetch("/api/accounts/total").then(this.loadAccountTotal);
        Api.fetch("/api/incomes/total").then(this.loadIncomeTotal);
    }

    loadAccountTotal(total) {
        this.setState({ accountTotal: total }, () => {
            (total) ?
                Api.fetch("/api/transactions/total").then(this.loadTransactionTotal) :
                this.setState({ fetching: false });
        })
    }

    loadTransactionTotal(total) {
        this.setState({ transactionTotal: total, fetching: false }, this.calculateBalance);
    }

    loadIncomeTotal(total) {
        this.setState({ incomeTotal: total });
    }

    calculateBalance() {
        this.setState({
            currentBalance: this.state.accountTotal - this.state.transactionTotal
        })
    }

    render() {
        return (
            <div className="current-balance">
                {
                    this.state.fetching && !this.state.accountTotal &&
                    <Loading />
                }
                {
                    !this.state.fetching && this.state.accountTotal &&
                    <React.Fragment>
                        <div className="title">Balance: </div>
                        {
                            //<div className="flex align-center space-between">
                            //    <div className="cell">Incomes Total (per month): </div>
                            //    <Money value={this.state.incomeTotal} />
                            //</div>
                        }
                        <hr />
                        <div className="flex align-center space-between">
                            <div className="cell">Checking Account: </div>
                            <Money value={this.state.accountTotal} />
                        </div>
                        <div className="flex align-center space-between">
                            <div className="cell">Pending Transactions: </div>
                            <Money value={this.state.transactionTotal} />
                        </div>
                        <hr />
                        <div className="flex align-center space-between balance">
                            <div className="cell">Current Balance: </div>
                            <Money value={this.state.currentBalance} />
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}

