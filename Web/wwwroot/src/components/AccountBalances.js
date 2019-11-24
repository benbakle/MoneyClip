import React from 'react';
import AccountBalance from './AccountBalance';
import Transactions from './../services/Transactions';
import Money from './Money';
import Moment from 'react-moment';

export default class AccountBalances extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upcomingBills: [],
        }
    }

    componentDidMount() {
        Transactions.subscribe(this.loadUpcomingTransactions);
    }

    loadUpcomingTransactions = () => {
        this.setState({ upcomingBills: Transactions.upcomingBills, fundsNeeded: Transactions.fundsNeeded });
    }

    render() {
        const { upcomingBills, fundsNeeded } = this.state;

        return (
            <div className="balances">
                <AccountBalance type="available" title="available cash" icon="plus" active={true} />
                <AccountBalance type="transactions" title="pending transactions" active={true} />
                <AccountBalance type="checking" title="checking" active={true} />
                <AccountBalance type="credit" title="credit debt" active={true} />
                <AccountBalance type="savings" title="savings" active={true} />
                <AccountBalance type="net" title="net worth" active={true} />
                <p>&nbsp;</p>
                <div className="grid">
                    <div className="title">Upcoming Bills...</div>
                    <div className="grid">
                        <div className="flex-row">
                            <div className="col-20 mc-label">Due Date</div>
                            <div className="col-60 mc-label">Description</div>
                            <div className="col-20 mc-label">Estimated</div>
                        </div>
                    </div>
                    {
                        upcomingBills && upcomingBills.map((i, k) =>
                            <div className="grid" key={k}>
                                <div className="flex-row">
                                    <div className="col-20"> <Moment date={i.date} format="MM-DD-YY" /></div>
                                    <div className="col-60">{i.description}</div>
                                    <div className="col-20"><Money value={i.amount} /></div>
                                </div>
                            </div>
                        )
                    }
                    <div className="grid">
                        <AccountBalance balance={fundsNeeded * -1} title="upcoming bills" />
                    </div>
                </div>
            </div>
        );
    }
}
