﻿import React from 'react';
import ApiFetch from '../ApiFetch/ApiFetch';
import Incomes from '../Incomes/Incomes';
import IncomesCreate from '../Incomes/Create';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <div className="mc-container">
                    <Incomes />
                    <IncomesCreate />
                </div>
            </div>
        );
    }
}