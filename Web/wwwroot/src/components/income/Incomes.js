import React from 'react';
import ApiFetch from '../ApiFetch';

export default class Incomes extends React.Component {
    handle({ failed, data, fetching, response }) {
        if (!fetching && data)
            return renderIncome(data);
        return (
            <div>
                Loading...
            </div>
        )
    }
    render() {
        return (
            <div className="incomes">
                <ApiFetch url='/api/incomes'>
                    {response => this.handle(response)}
                </ApiFetch>
            </div>
        );
    }
}

function sumProperty(arr, type) {
    return arr.reduce((total, obj) => {
        if (typeof obj[type] === 'string') {
            return total + Number(obj[type]);
        }
        return total + obj[type];
    }, 0);
}

function renderIncome(data) {
    return (
        <div>
            <div className="section-header">
                <div className="title">
                    <span>Income&nbsp;&nbsp;</span>
                    <span className="income-total">${sumProperty(data, 'amount')} <span>/ month</span></span>
                </div>
                <div className="settings">
                    <button /*onClick={this.openSettings()}*/>
                        <i className="fas fa-cog"></i>
                    </button>
                </div>
            </div>
            <div className="income-content">
                <div className="income-list">
                    {data.map((income, index) =>
                        <div key={index} className="income">
                            <div className="description">{income.description}</div>
                            <span className="amount">${income.amount}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

//function empty(data) {
//    return data && data.length === 0;
//}
