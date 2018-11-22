import React from 'react';
import ApiFetch from '../ApiFetch/ApiFetch';

export default class IncomesCreate extends React.Component {
    constructor() {
        super();

        this.state = {
            description: "",
            amount: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    render() {
        return (
            <div className="incomes board">
                <div className="mc-container">
                    <div className="section-header">
                        <div className="title">
                            <span>Add</span>
                        </div>
                    </div>
                    <div className="income-content">
                        <label>Description:</label>
                        <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                        <div>
                            {this.state.description}
                        </div>
                        <label>Amount:</label>
                        <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />
                        <div>
                            {this.state.amount}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
