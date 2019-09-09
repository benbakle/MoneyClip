import React from 'react';
import Loading from './Loading';
import Money from './Money';
import Balance from '../services/Balance';

export default class AccountBalance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: null,
        }
    }

    componentDidMount() {
        this.setActiveState();
        this.mounted = true;
        Balance.subscribe(this.load);
    }

    setActiveState = () => {
        if (this.props.active !== undefined)
            this.setState({ active: this.props.active });
    }

    componentDidUnount() {
        this.mounted = false;
    }

    load = () => {
        if (Balance[this.props.type])
            this.setMountedState({ balance: Balance[this.props.type].balance });
    }

    setMountedState = (state, callback) => {
        if (this.mounted)
            this.setState(state, callback && callback());
    }

    toggleActive = () => {
        this.setState({ active: !this.state.active });
    }

    render() {
        const { balance, active } = this.state;
        const { title, type, icon } = this.props;
        const { toggleActive } = this;

        return (
            <>
                {
                    !balance && balance !== 0 &&
                    <Loading />
                }
                {
                    (balance || balance === 0) &&
                    <div className={`account-balance ${type} ${active ? "active" : ""}`} >
                        <button className="pin" onClick={toggleActive}>
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
                            <i className={`fas fa-${icon}-circle`}></i>
                        </div>
                        <div className="value">
                            <div className="amount"><Money value={balance} /></div>
                            <button className="type" onClick={() => alert()}>
                                {title} <i className={`fas fa-info-circle`}></i>
                            </button>
                        </div>
                    </div>
                }
            </>
        );
    }
}

