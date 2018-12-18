import React from 'react';
import Api from '../../services/Api';

export default class Update extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            incomeID: null,
            description: "",
            amount: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.callback = this.callback.bind(this);
    }

    componentDidMount() {
        this.props.income &&
            this.setState({
                incomeID: this.props.income.incomeID,
                description: this.props.income.description,
                amount: this.props.income.amount
            });
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    submit() {
        Api.update("incomes", this.state.incomeID, this.state).then(this.callback);
    }

    callback() {
        this.props.callback && this.props.callback();
    }

    render() {
        return (
            this.props.income &&
            <React.Fragment>
                <div>
                    <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                    <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />
                </div>
                <div>
                    <button className="submit link" onClick={this.submit}><i className="far fa-check-circle"></i></button>
                </div>
            </React.Fragment>

        )
    }
}
