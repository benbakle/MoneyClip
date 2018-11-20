import React from 'react';
import ApiFetch from './ApiFetch';

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
                <div className="mc-container">
                    <h1>Incomes</h1>
                    <ApiFetch url='/api/incomes'>
                        {response => this.handle(response)}
                    </ApiFetch>
                </div>
            </div >
        );
    }
}
function renderIncome(data) {
    return (
        <div className="income-list">
            {data.map((income, index) =>
                <div key={index} className="income">
                    <label>{income.description}</label>
                    <span className="content">&nbsp;${income.amount}</span>
                </div>
            )}
        </div>
    )
}
function empty(data) {
    return data && data.length === 0;
}
