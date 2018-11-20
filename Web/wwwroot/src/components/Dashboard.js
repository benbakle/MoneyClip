import React from 'react';
import ApiFetch from './ApiFetch';

export default class Dashboard extends React.Component {
    handle({ failed, data, fetching, response }) {
        if (!fetching && data)
            return renderIncome(data);
        //     return <Loading />;
    }


    render() {
        return (
            <div className="dashboard">
                <div className="mc-container">
                    <h1>Dashboard</h1>
                </div>
                <ApiFetch url='/api/income'>
                    {response => this.handle(response)}
                </ApiFetch>
            </div >
        );
    }
}
function renderIncome(data) {
    return (
        <div>
            {data.map((income, index) =>
                <div key={index}>
                    {income.amount}
                </div>
            )}
        </div>
    )
}
function empty(data) {
    return data && data.length === 0;
}
