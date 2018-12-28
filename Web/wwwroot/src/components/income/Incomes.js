﻿import React from 'react';
import Api from '../../services/Api';
import Create from './Create';
import Income from './Income';
import Loading from '../Loading';
import Money from '../Money';
import AnimateHeight from 'react-animate-height';
import Helpers from '../../Helpers';

export default class Incomes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            incomes: [],
            apiFetching: true,
            inAddMode: false,
        }

        this.callback = this.callback.bind(this);
        this.load = this.load.bind(this);
        this.fetch = this.fetch.bind(this);
        this.toggleAddMode = this.toggleAddMode.bind(this);

        this.fetch();
    }

    load(data) {
        this.setState({
            incomes: data,
            apiFetching: false,
        })
    }

    callback() {
        this.setState({
            apiFetching: true,
            inAddMode: false
        }, this.fetch);
    }

    fetch() {
        Api.fetch("incomes", "description").then(this.load);
    }

    toggleAddMode() {
        this.setState({ inAddMode: !this.state.inAddMode });
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
                    <React.Fragment>
                        <div className="flex space-between">
                            <div className="title">Incomes</div>
                            <button className="add link" onClick={this.toggleAddMode}>
                                {this.state.inAddMode ? <i className='far fa-times-circle'></i> : <i className="fas fa-plus-circle"></i>}
                            </button>
                        </div>
                        <AnimateHeight duration={500} height={!this.state.inAddMode ? 0 : 'auto'}>
                            {
                                <Create callback={this.callback} />
                            }
                        </AnimateHeight>
                        {displayIncomes(this.state.incomes, this.callback)}
                        <div className="income-total">
                            <div className="flex flex-end">
                                <div>
                                    Total: <Money value={Helpers.sumProperty(this.state.incomes, 'amount')} />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}

function displayIncomes(data, callback) {
    return (
        data.map((income, index) =>
            <Income key={index} item={income} callback={callback} />
        )
    )
}

function empty(data) {
    return data && data.length === 0;
}
