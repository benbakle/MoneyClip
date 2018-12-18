import React from 'react';
import Api from '../../services/Api';

export default class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: "",
            amount: "",
            amountIsValid: true
        }

        this.validateDescription = this.validateDescription.bind(this);
        this.validateAmount = this.validateAmount.bind(this);
        this.submit = this.submit.bind(this);
    }

    validateDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    validateAmount(e) {
        (/^\d*\.?\d*$/.test(e.target.value))
            ? this.setState({ amount: e.target.value, amountIsValid: true })
            : this.setState({ amountIsValid: false });
    }

    submit() {
        if (this.state.description != "" && this.state.amount != "") {
            let income = {
                Description: this.state.description,
                Amount: this.state.amount
            }
            Api.create('incomes', income).then(this.props.callback);
        }
    }

    render() {
        return (
            <div className="create-income">
                <div className="description">
                    <label>Description:</label>
                    {
                        this.state.description == "" &&
                        <span className="required">*</span>
                    }
                    <input type="text" name="description" onChange={this.validateDescription} value={this.state.description} />
                </div>
                <div className="amount">
                    <label>Amount:</label>
                    {
                        this.state.amount == "" &&
                        <span className="required">*</span>
                    }
                    <input autoComplete="off" type="text" name="amount" onChange={this.validateAmount} value={this.state.amount} />
                    {
                        !this.state.amountIsValid &&
                        <div className="help">'amount' can only be a number</div>
                    }
                    <div className="flex flex-end">
                        <button className="button" onClick={this.submit}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}
