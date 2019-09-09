import React from 'react';
import Account from '../services/Account';
import AccountBalance from './AccountBalance';

export default class AccountBalances extends React.Component {

    render() {
        return (
            <div className="balances">
                <AccountBalance type="available" title="available cash" icon="plus" active={true} />
                <AccountBalance type="transactions" title="pending transactions" />
                <AccountBalance type="checking" title="checking" />
                <AccountBalance type="credit" title="credit debt" />
                <AccountBalance type="savings" title="savings" />
                <AccountBalance type="net" title="net worth" active={true} />
            </div>
        );
    }
}

