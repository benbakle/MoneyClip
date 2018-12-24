import React from 'react';
import Api from '../../services/Api';
import Loading from '../Loading';
import Transaction from './Transaction';
import Create from './Create';
import Helpers from '../../Helpers';
import Money from '../Money';

export default class Transactions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            fetching: true,
            inCreateMode: false
        }

        this.load = this.load.bind(this);
        this.fetch = this.fetch.bind(this);
        this.toggleCreateMode = this.toggleCreateMode.bind(this);
        this.callback = this.callback.bind(this);

        this.fetch();
    }

    load(data) {
        this.setState({
            data: data,
            fetching: false
        })
    };

    fetch() {
        Api.fetch("transactions", "date").then(this.load);
    }

    toggleCreateMode() {
        this.setState({
            inCreateMode: !this.state.inCreateMode
        })
    }

    callback() {
        this.setState({
            fetching: true,
            inCreateMode: false
        }, this.fetch);
    }

    render() {
        return (
            <div className="transactions">
                <div className="flex space-between">
                    <div className="title">Transactions</div>
                    <button className="create link" onClick={this.toggleCreateMode}>
                        {this.state.inCreateMode ? <i className='far fa-times-circle'></i> : <i className="fas fa-plus-circle"></i>}
                    </button>
                </div>
                {
                    this.state.fetching &&
                    <Loading />
                }
                {
                    !this.state.fetching && this.state.data && this.state.inCreateMode &&
                    <Create callback={this.callback} />
                }
                {
                    !this.state.fetching && this.state.data &&
                    <React.Fragment>
                        {displayTransactions(this.state.data, this.callback)}
                        {displayTransactionsTotal(this.state.data)}
                    </React.Fragment>
                }
            </div>
        )
    }
}

function displayTransactions(transactions, callback) {
    return (
        transactions.map((item, key) =>
            <Transaction transaction={item} key={key} callback={callback} />
        )
    )
}

function displayTransactionsTotal(transactions) {
    return (
        <div className="transaction-total">
            <div className="flex flex-end">
                <div>
                    Total: <Money value={Helpers.sumProperty(transactions, 'amount')} />
                </div>
            </div>
        </div>
        )
}