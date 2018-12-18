import React from 'react';
import Api from '../../services/Api';

export default class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: "",
            amount: "",
            amountIsValid: true,
            amountHasBeenUpdated: false,
            descriptionHasBeenUpdated: false
        }

        this.validateDescription = this.validateDescription.bind(this);
        this.validateAmount = this.validateAmount.bind(this);
        this.submit = this.submit.bind(this);
    }

    validateDescription(e) {
        this.setState({
            description: e.target.value,
            descriptionHasBeenUpdated: true
        })
    }

    validateAmount(e) {
        (/^\d*\.?\d*$/.test(e.target.value))
            ? this.setState({ amount: e.target.value, amountIsValid: true, amountHasBeenUpdated: true })
            : this.setState({ amountIsValid: false });
    }

    submit() {
        if (this.state.description == "")
            this.setState({ descriptionHasBeenUpdated: true });

        if (this.state.amount == "")
            this.setState({ amountHasBeenUpdated: true });

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
                    <span className="required">
                        {this.state.description == "" && this.state.descriptionHasBeenUpdated && "*"}
                    </span>
                    <input type="text" name="description" onChange={this.validateDescription} value={this.state.description} />
                </div>
                <div className="amount">
                    <label>Amount:</label>
                    <span className="required">
                        {this.state.amount == "" && this.state.amountHasBeenUpdated && "*"}
                    </span>
                    <input autoComplete="off" type="text" name="amount" onChange={this.validateAmount} value={this.state.amount} />
                    {
                        !this.state.amountIsValid &&
                        <div className="help">'Amount' must be a number</div>
                    }
                    <div className="flex flex-end">
                        <button className="button" onClick={this.submit}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}
