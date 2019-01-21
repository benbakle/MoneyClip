﻿import React from 'react';
import Api from '../../services/Api';

export default class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            balance: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    submit() {
        let account = { Name: this.state.name, Balance: this.state.balance };
        Api.create("accounts", account).then(this.props.callback);
    }

    render() {
        return (
            <div className="create">
                <label>Account Name: </label>
                <div className="input-wrapper">
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                </div>
                <label>Amount: </label>
                <div className="input-wrapper">
                    <input type="text" name="balance" onChange={this.handleChange} value={this.state.balance} />
                </div>
                <button className="button submit" onClick={this.submit}>Add </button>
            </div>
        );
    }
}
