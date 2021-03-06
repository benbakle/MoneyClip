﻿import React from 'react';
import Api from '../../services/Api';

export default class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            balance: 0,
            offset: 0,
            type: 0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    submit() {
        const { name, balance, offset, type } = this.state;
        let account = { Name: name, Balance: balance, Offset: offset, Type: type };
        Api.create("accounts", account).then(this.props.callback);
    }

    render() {
        return (
            <>
                <div className="input-wrapper cell name">
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                </div>
                <div className="cell type select-wrapper cell type">
                    <select type="text" name="type" onChange={this.handleChange} value={this.state.type} >
                        <option value="credit">credit</option>
                        <option value="checking">checking</option>
                        <option value="savings">savings</option>
                    </select>
                </div>

                <div className="input-wrapper cell balance">
                    <input type="text" name="balance" onChange={this.handleChange} value={this.state.balance} />
                </div>
                <div className="input-wrapper cell offset">
                    <input type="text" name="offset" onChange={this.handleChange} value={this.state.offset} />
                </div>
                <div className="button-wrapper">
                    <button className="button submit" onClick={this.submit}>Add </button>
                </div>
            </>
        );
    }
}
