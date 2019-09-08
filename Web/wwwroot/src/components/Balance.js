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
            currentBalance: 0,
            credit: 0,
        }

        this.loadCheckingTotal = this.loadCheckingTotal.bind(this);
        this.loadTransactionTotal = this.loadTransactionTotal.bind(this);
        this.loadIncomeTotal = this.loadIncomeTotal.bind(this);
        this.calculateBalance = this.calculateBalance.bind(this);

    }
    componentDidMount() {
        Api.fetch("/api/accounts/total/checking").then(this.loadCheckingTotal);
        Api.fetch("/api/accounts/total/credit").then(this.loadCreditTotal);
        Api.fetch("/api/incomes/total").then(this.loadIncomeTotal);
    }

    loadCheckingTotal(total) {
        this.setState({ accountTotal: total }, () => {
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
            currentBalance: this.state.accountTotal - this.state.transactionTotal
        })
    }

    render() {
        return (
            <div className="balances">
                {
                    this.state.fetching && !this.state.accountTotal &&
                    <Loading />
                }
                {
                    !this.state.fetching && this.state.accountTotal &&
                    <>
                        <div className="balance plus active">
                            <div className="icon"><i className="fas fa-plus-circle"></i></div>
                            <div className="value">
                                <div className="amount"><Money value={this.state.currentBalance} /></div>
                                {
                                //<Money value={this.state.transactionTotal} />
                                }
                                <div className="type">available cash</div>
                            </div>
                        </div>
                        <div className="balance minus">
                            <div className="icon"><i className="fas fa-minus-circle"></i></div>
                            <div className="value">
                                <div className="amount"><Money value={this.state.credit} /></div>
                                <div className="type">credit debt</div>
                            </div>
                        </div>
                        <div className="balance savings">
                            <div className="icon"><i className="fas fa-plus-circle"></i></div>
                            <div className="value">
                                <div className="amount"><Money value={0} /></div>
                                <div className="type">savings</div>
                            </div>
                        </div>
                    </>
                }
            </div>
        );
    }
}

