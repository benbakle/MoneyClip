import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';

export default class Navigation extends React.Component {
    render() {
        return (
            <div className="main-navigation">
                <ul>
                    <li>
                        <NavLink to="/dashboard" className="link" activeClassName="active">
                            <i className="fas fa-tachometer-alt"></i>
                            &nbsp;Dashboard
                           </NavLink>
                    </li>
                    <li>
                        <NavLink to="/accounts" className="link" activeClassName="active">
                            <i className="far fa-money-bill-alt"></i>
                            &nbsp;Accounts
                           </NavLink>
                    </li>
                    <li>
                        <NavLink to="/transactions" className="link" activeClassName="active">
                            <i className="far fa-money-bill-alt"></i>
                            &nbsp;Transactions
                           </NavLink>
                    </li>
                    <li>
                        <NavLink to="/incomes" className="link" activeClassName="active">
                            <i className="far fa-money-bill-alt"></i>
                            &nbsp;Incomes
                           </NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}
