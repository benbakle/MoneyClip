import React from 'react';
import Incomes from './income/Incomes';
import Card from './layouts/BoardCard';
import Transactions from './transaction/Transactions';
import Accounts from './account/Accounts';
import Listings from './layouts/Listings';
import CreateIncome from './income/Create';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <div className="mc-container flex space-between">
                    <Card card={<Incomes />} />
                    <Card card={<Transactions />} />
                    <Card card={<Accounts />} />
                    <Card card={<Listings type="incomes" create={<CreateIncome />} orderBy="description" />} />
                    <Card card={<Listings type="transactions"  orderBy="date" />} />
                    <Card card={<Listings type="accounts" orderBy="name" />} />
                </div>
            </div>
        );
    }
}