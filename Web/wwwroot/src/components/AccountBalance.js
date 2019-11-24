import React from 'react';
import Loading from './Loading';
import Money from './Money';
import Account from '../services/Account';

export default class AccountBalance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: null,
            fetching: true,
            breakdown: null,
        }
    }

    componentDidMount() {
        this.setActiveState();
        this.mounted = true;
        Account.subscribe(this.load);
        console.log()
    }

    componentDidUnount() {
        this.mounted = false;
    }

    setActiveState = () => {
        if (this.props.active !== undefined)
            this.setState({ active: this.props.active });
    }

    load = () => {

        if (Account.balanceByType(this.props.type))
            return this.setMountedState({ balance: Account.balanceByType(this.props.type), fetching: false });
        this.setMountedState({ balance: this.props.balance, fetching: false });
    }

    loadBreakdown = () => {
        if (this.props.type === "available")
            this.setState({ breakdown: Account.accounts.filter(a => a.type === this.props.type)[0].breakdown });
    }

    setMountedState = (state, callback) => {
        if (this.mounted)
            this.setState(state, callback && callback());
    }

    toggleActive = () => {
        this.setState({ active: !this.state.active });
    }

    toggleBreakdownView = () => {
        this.loadBreakdown();
        console.log(this.state.breakdown);
    }

    icon = () => {
        const { type } = this.props;
        const { balance } = this.state;

        if (type === "credit" || type === "transactions" || balance < 0)
            return "minus";
        return "plus";
    }

    render() {
        const { balance, active, fetching, breakdown } = this.state;
        const { title, type } = this.props;
        const { toggleActive, icon, toggleBreakdownView } = this;

        return (
            <>
                {
                    fetching && !balance && balance !== 0 &&
                    <Loading />
                }
                {
                    !fetching && (balance || balance === 0) &&
                    <div className={`account-balance ${type} ${icon()} ${active ? "active" : ""}`} >
                        <div className="spacer"></div>
                        <button title={active ? "unpin" : "pin"} className="pin" onClick={toggleActive}>
                            {
                                active &&
                                <i className={`fas fa-times-circle`}></i>
                            }
                            {
                                !active &&
                                <i className={`fas fa-circle`}></i>
                            }
                        </button>
                        <div className="icon">
                            <i className={`fas fa-${icon()}-circle`}></i>
                        </div>
                        <div className="value">
                            <div className="amount"><Money value={Math.abs(balance)} /></div>
                            <button className="type" onClick={() => toggleBreakdownView()} title={`view ${title} breakdown`}>
                                {title} <i className={`fas fa-info-circle`}></i>
                            </button>
                        </div>
                        <div>
                            {
                                breakdown && breakdown.map((i, k) =>
                                    <div key={k}>
                                        {i.desc}{i.balance}
                                    </div>
                                )

                            }
                        </div>
                    </div>
                }
            </>
        );
    }
}

