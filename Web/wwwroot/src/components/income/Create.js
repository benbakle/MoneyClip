import React from 'react';

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
        fetch('/api/incomes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Description: this.state.description,
                Amount: this.state.amount
            })
        })
        window.location.reload();
    }

    render() {
        return (
            <div className="create-income">
                <div className="section-header">
                    <div className="title">
                        <span>Add</span>
                    </div>
                    <div className="settings">
                        <button /*onClick={this.openSettings()}*/>
                            <i className="fas fa-times"></i>
                        </button>
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
                    <button onClick={this.submit}>Submit</button>
                </div>
            </div>
        );
    }
}
