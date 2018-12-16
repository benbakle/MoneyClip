import React from 'react';
import Api from '../../services/Api';
import Delete from './Delete';
import Create from './Create';
import Loading from '../Loading';
import Money from '../Money';

export default class Incomes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incomes: [],
            apiFetching: true,
        }

        this.reload = this.reload.bind(this);
        this.load = this.load.bind(this);
        this.fetch = this.fetch.bind(this);

        this.fetch();
    }

    load(data) {
        this.setState({
            incomes: data,
            apiFetching: false,
        })
    }

    fetch() {
        Api.fetch("incomes").then(this.load);
    }

    reload() {
        this.setState({
            apiFetching: true
        }, () => { this.fetch() });
    }

    render() {
        return (
            <div className="incomes">
                {this.state.apiFetching &&
                    <Loading />
                }
                {
                    !this.state.apiFetching && empty(this.state.incomes) &&
                    <div>No income found</div>
                }
                {
                    !this.state.apiFetching && !empty(this.state.incomes) &&
                    <div>
                        <div className="title">
                            <span>Income&nbsp;&nbsp;</span>
                            <span className="income-total">${sumProperty(this.state.incomes, 'amount')} <span>/ month</span></span>
                        </div>
                        {displayIncomes(this.state.incomes, this.reload)}
                        <Create callback={this.reload} />
                    </div>
                }
            </div>
        );
    }
}

function displayIncomes(data, callback) {
    return (
        data.map((income, index) =>
            <div key={index} className="income">
                <div className="description">{income.description}</div>
                <Money className="amount" value={income.amount} />
                <Delete id={income.incomeID} callback={callback} />
            </div>
        )
    )
}

function empty(data) {
    return data && data.length === 0;
}

function sumProperty(arr, type) {
    return arr.reduce((total, obj) => {
        if (typeof obj[type] === 'string')
            return total + Number(obj[type]);
        return total + obj[type];
    }, 0);
}

