import React from 'react';
import Incomes from './income/Incomes';
import Create from './income/Create';
import Card from './layouts/BoardCard';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <div className="mc-container">
                    <Card card={<Incomes />} />
                    <Card card={<Create />} />
                </div>
            </div>
        );
    }
}