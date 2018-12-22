import React from 'react';
import Incomes from './income/Incomes';
import Card from './layouts/BoardCard';
import StoredValues from './StoredValues';
import Transaction from './transaction/Transaction';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <div className="mc-container">
                    <Card card={<Incomes />} />
                    <Card card={<Transaction />} />
                    <Card card={<StoredValues field="bankBalance" label="Balance"  />} />
                </div>
            </div>
        );
    }
}