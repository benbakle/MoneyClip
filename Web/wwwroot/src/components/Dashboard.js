import React from 'react';
import Incomes from './income/Incomes';
import Card from './layouts/BoardCard';
import Transactions from './transaction/Transactions';
import Accounts from './account/Accounts';
import Listing from './layouts/Listing';
import CreateIncome from './income/Create';
import UpdateIncome from './income/Update';
import CreateTransaction from './transaction/Create';
import UpdateTransaction from './transaction/Update';
import CreateAccount from './account/Create';
import UpdateAccount from './account/Update';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <div className="mc-container flex space-between">
                    <Card card={<Incomes />} />
                    <Card card={<Transactions />} />
                    <Card card={<Accounts />} />
                    <Card card={<Listing type="incomes" update={<UpdateIncome />} create={<CreateIncome />} orderBy="description" />} />
                    <Card card={<Listing type="accounts" update={<UpdateAccount />} create={<CreateAccount />} orderBy="name" />} />
                    <Card card={<Listing type="transactions" update={<UpdateTransaction />} create={<CreateTransaction />} orderBy="date" />} />
                </div>
            </div>
        );
    }
}