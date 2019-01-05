import React from 'react';
import Api from '../../services/Api';

export default class Update extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            description: "",
            amount: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.callback = this.callback.bind(this);
    }

    componentDidMount() {
        this.props.item &&
            this.setState({
                id: this.props.item.id,
                description: this.props.item.description,
                amount: this.props.item.amount
            });
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    submit() {
        Api.update("incomes", this.state.id, this.state).then(this.callback);
    }

    callback() {
        this.props.callback && this.props.callback();
    }

    render() {
        return (
            this.props.item &&
            <div className="income">
                <div className="description" >
                    <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                </div>
                <div className="amount" >
                    <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />
                </div>
                <button className="submit link" onClick={this.submit}><i className="far fa-check-circle"></i></button>
            </div>

        )
    }
}
