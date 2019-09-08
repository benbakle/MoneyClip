import React from 'react';
import Api from '../../services/Api';

export default class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            balance: 0,
            offset: 0,
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
                <label>Type: </label>
                <div className="cell type select-wrapper">
                    <select type="text" name="type" onChange={this.handleChange} value={this.state.type} >
                        <option value="Credit">credit</option>
                        <option value="Checking">checking</option>
                        <option value="Savings">savings</option>
                    </select>
                </div>

                <label>Amount: </label>
                <div className="input-wrapper">
                    <input type="text" name="balance" onChange={this.handleChange} value={this.state.balance} />
                </div>
                <label>Offset: </label>
                <div className="input-wrapper">
                    <input type="text" name="offset" onChange={this.handleChange} value={this.state.offset} />
                </div>
                <button className="button submit" onClick={this.submit}>Add </button>
            </div>
        );
    }
}
