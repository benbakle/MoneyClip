import React from 'react';
import Api from '../../services/Api';

export default class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            description: "",
            number: "",
            amount: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    submit() {
        let transaction = { Date: this.state.date, Description: this.state.description, Amount: this.state.amount, Number: this.state.number };
        Api.create("transactions", transaction).then(this.props.callback);
    }

    render() {
        return (
            <div className="create-transaction">
                <div>Post Date: </div>
                <div className="input-wrapper">
                    <input type="date" name="date" onChange={this.handleChange} value={this.state.date} />
                </div>
                <div>Description: </div>
                <div className="input-wrapper">
                    <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                </div>
                <div>Amount: </div>
                <div className="input-wrapper">
                    <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />
                </div>
                <div>Number: </div>
                <div className="input-wrapper">
                    <input type="text" name="number" onChange={this.handleChange} value={this.state.number} />
                </div>
                <button className="button submit" onClick={this.submit}>Add </button>
            </div>
        );
    }
}
