import React from 'react';
import Api from '../../services/Api';
import DeleteButton from './Delete';
import Loading from '../Loading';

export default class Incomes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            incomes: [],
            apiFetching: true
        }

        this.loadIncome = this.loadIncome.bind(this);

        Api.fetch("/api/incomes").then(this.loadIncome);
    }

    loadIncome(data) {
        this.setState({
            incomes: data,
            apiFetching: false
        })
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
                        {displayIncomes(this.state.incomes)}
                    </div>
                }
            </div>
        );
    }


}

function displayIncomes(data) {
    return (
        data.map((income, index) =>
            <div key={index} className="income">
                <div className="description">{income.description}</div>
                <span className="amount">${income.amount.toFixed(2)}</span>
                {
                    //  <DeleteButton id={income.incomeID} />
                }
            </div>
        )
    )
}

function empty(data) {
    return data && data.length === 0;
}

function sumProperty(arr, type) {
    return arr.reduce((total, obj) => {
        if (typeof obj[type] === 'string') {
            return total + Number(obj[type]);
        }
        return total + obj[type];
    }, 0);
}

//function renderIncome(data) {
//    return (
//        <div>
//            <div className="section-header">
//                <div className="title">
//                    <span>Income&nbsp;&nbsp;</span>
//                    <span className="income-total">${sumProperty(data, 'amount')} <span>/ month</span></span>
//                </div>
//                <div className="settings">
//                    <button /*onClick={this.openSettings()}*/>
//                        <i className="fas fa-cog"></i>
//                    </button>
//                </div>
//            </div>
//            <div className="income-content">
//                <div className="income-list">
//                    {data.map((income, index) =>
//                        <div key={index} className="income">
//                            <div className="description">{income.description}</div>
//                            <span className="amount">${income.amount}</span>
//                            <DeleteButton id={income.incomeID} />
//                        </div>
//                    )}
//                </div>
//            </div>
//        </div>
//    )
//}


