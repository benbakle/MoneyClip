import React from 'react';
import Api from '../services/Api';
import Loading from './Loading';
import Money from './Money';

export default class Balance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            checkingTotal: null,
            transactionTotal: 0,
            incomeTotal: 0,
            currentBalance: 0,
            credit: 0,
        }

        this.loadCheckingTotal = this.loadCheckingTotal.bind(this);
        this.loadTransactionTotal = this.loadTransactionTotal.bind(this);
        this.loadIncomeTotal = this.loadIncomeTotal.bind(this);
        this.calculateBalance = this.calculateBalance.bind(this);

    }
    componentDidMount() {
        Api.fetch("/api/accounts/balance/checking").then(this.loadCheckingTotal);
        Api.fetch("/api/accounts/balance/credit").then(this.loadCreditTotal);
        Api.fetch("/api/incomes/total").then(this.loadIncomeTotal);
    }

    loadCheckingTotal(total) {
        this.setState({ checkingTotal: total }, () => {
            (total) ?
                Api.fetch("/api/transactions/total").then(this.loadTransactionTotal) :
                this.setState({ fetching: false });
        })
    }

    loadCreditTotal = (total) => {
        this.setState({ credit: total });
    }

    loadTransactionTotal(total) {
        this.setState({ transactionTotal: total, fetching: false }, this.calculateBalance);
    }

    loadIncomeTotal(total) {
        this.setState({ incomeTotal: total });
    }

    calculateBalance() {
        this.setState({
            currentBalance: this.state.checkingTotal - this.state.transactionTotal
        })
    }

    render() {
        return (
            <div className="balances">
                {
                    this.state.fetching && !this.state.checkingTotal &&
                    <Loading />
                }
                {
                    !this.state.fetching && this.state.checkingTotal &&
                    <>
                        <button className="balance available active">
                            <div className="icon"><i className="fas fa-plus-circle"></i></div>
                            <div className="value">
                                <div className="amount"><Money value={this.state.currentBalance} /></div>
                                <div className="type">available cash</div>
                            </div>
                        </button>
                        <button className="balance checking">
                            <div className="icon"><i className="fas fa-plus-circle"></i></div>
                            <div className="value">
                                <div className="amount"><Money value={this.state.checkingTotal} /></div>
                                {
                                    //<Money value={this.state.transactionTotal} />
                                }
                                <div className="type">checking</div>
                            </div>
                        </button>
                        <button className="balance credit">
                            <div className="icon"><i className="fas fa-minus-circle"></i></div>
                            <div className="value">
                                <div className="amount"><Money value={this.state.credit} /></div>
                                <div className="type">credit debt</div>
                            </div>
                        </button>
                        <button className="balance savings">
                            <div className="icon"><i className="fas fa-plus-circle"></i></div>
                            <div className="value">
                                <div className="amount"><Money value={0} /></div>
                                <div className="type">savings</div>
                            </div>
                        </button>
                    </>
                }
            </div>
        );
    }
}

