import React from 'react';
import Api from '../../services/Api';

export default class Create extends React.Component {
    constructor(props) {
        super(props);

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
                <label>Description:</label>
                <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />

                <label>Amount:</label>
                <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />

                <button onClick={this.submit}>Submit</button>
            </div>
        );
    }
}
