import React from 'react';
import Api from '../../services/Api';
import Create from './Create';
import Income from './Income';
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

    reload() {
        this.setState({
            apiFetching: true
        }, this.fetch);
    }

    fetch() {
        Api.fetch("incomes","description").then(this.load);
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
                        <div className="income-total">
                            Total: <Money value={sumProperty(this.state.incomes, 'amount')} />
                        </div>
                        <div className="title">Income</div>
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
            <Income key={index} income={income} callback={callback} />
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

