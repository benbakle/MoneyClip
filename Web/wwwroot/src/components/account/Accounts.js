import React from 'react';
import Api from '../../services/Api';
import Loading from '../Loading';
import Account from './Account';
import Create from './Create';
import Helpers from '../../Helpers';
import Money from '../Money';

export default class Accounts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: [],
            fetching: true,
            inCreateMode: false
        }

        this.load = this.load.bind(this);
        this.fetch = this.fetch.bind(this);
        this.toggleCreateMode = this.toggleCreateMode.bind(this);
        this.callback = this.callback.bind(this);

        this.fetch();
    }

    load(data) {
        this.setState({
            accounts: data,
            fetching: false
        })
    };

    fetch() {
        Api.fetch("accounts", "name").then(this.load);
    }

    toggleCreateMode() {
        this.setState({
            inCreateMode: !this.state.inCreateMode
        })
    }

    callback() {
        this.setState({
            fetching: true,
            inCreateMode: false
        }, this.fetch);
    }

    render() {
        return (
            <div className="accounts">
                <div className="flex space-between">
                    <div className="title">Accounts</div>
                    <button className="create link" onClick={this.toggleCreateMode}>
                        {this.state.inCreateMode ? <i className='far fa-times-circle'></i> : <i className="fas fa-plus-circle"></i>}
                    </button>
                </div>
                {
                    this.state.fetching &&
                    <Loading />
                }
                {
                    !this.state.fetching && this.state.accounts && this.state.inCreateMode &&
                    <Create callback={this.callback} />
                }
                {
                    !this.state.fetching && this.state.accounts &&
                    <React.Fragment>
                        {displayAccounts(this.state.accounts, this.callback)}
                        {displayAccountsTotal(this.state.accounts)}
                    </React.Fragment>
                }
            </div>
        )
    }
}

function displayAccounts(accounts, callback) {
    return (
        accounts.map((item, key) =>
            <Account account={item} key={key} callback={callback} />
        )
    )
}

function displayAccountsTotal(accounts) {
    return (
        <div className="account-total">

            <div className="flex flex-end">
                <div>
                    Total: <Money value={Helpers.sumProperty(accounts, 'balance')} />
                </div>
            </div>
        </div>
    )
}