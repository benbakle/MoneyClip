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
            transactionTotal: null,
            currentBalance: null
        }

        this.loadIncomeTotal = this.loadIncomeTotal.bind(this);
        this.loadTransactionTotal = this.loadTransactionTotal.bind(this);

        Api.fetch("/accounts/total").then(this.loadIncomeTotal);
    }

    loadIncomeTotal(total) {
        this.setState({ accountTotal: total }, () => {
            (total) ?
                Api.fetch("/transactions/total").then(this.loadTransactionTotal) :
                this.setState({ fetching: false });
        })
    }

    loadTransactionTotal(total) {
        this.setState({ transactionTotal: total, fetching: false }, this.calculateBalance);
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
                    !this.state.fetching && this.state.accountTotal && this.state.transactionTotal &&
                    <Money value={this.state.currentBalance} />
                }
            </div>
        );
    }
}

