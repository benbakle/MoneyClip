﻿import React from 'react';
import History from '../../services/History';
import Api from '../../services/Api';

export default class Create extends React.Component {
    constructor() {
        super();

        this.state = {
            description: "",
            amount: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    submit() {
        let income = {
            Description: this.state.description,
            Amount: this.state.amount
        }
        Api.create('incomes', income).then(this.props.callback);
    }
    render() {
        return (
            <div className="create-income">
                <div className="section-header">
                    <div className="title">
                        <span>Add</span>
                    </div>
                    <div className="settings">
                        <button>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div className="income-content">
                    <label>Description:</label>
                    <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />

                    <label>Amount:</label>
                    <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />

                    <button onClick={this.submit}>Submit</button>
                </div>
            </div>
        );
    }
}
