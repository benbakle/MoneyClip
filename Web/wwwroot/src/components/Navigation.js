﻿import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';

export default class Navigation extends React.Component {
    render() {
        return (
            <div className="main-navigation">
                <ul>
                    <li>
                        <NavLink to="/accounts" className="link" activeClassName="active">
                            Accounts
                           </NavLink>
                    </li>
                    <li>
                        <NavLink to="/transactions" className="link" activeClassName="active">
                            Transactions
                           </NavLink>
                    </li>
                    {
                        //<li>
                        //    <NavLink to="/transactions-wip" className="link" activeClassName="active">
                        //        Transactions-WIP
                        //       </NavLink>
                        //</li>
                    }
                </ul>
            </div>
        );
    }
}
