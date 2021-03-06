﻿import React from 'react';
import Api from '../../services/Api';

export default class Update extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            description: "",
            amount: null
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

    componentWillReceiveProps(props) {
        if (props.triggerUpdate)
            this.submit();
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    submit() {
        Api.update("incomes", this.state.id, this.state).then(this.callback);
    }

    callback(res) {
        if (res.ok) {
            this.props.callback();
        }
        else {
            Notification.error({ text: res.statusText })
        }
    }

    render() {
        return (
            this.props.item &&
            <div className="income">
                <div className="cell description input-wrapper" >
                    <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                </div>
                <div className="cell amount input-wrapper">
                    <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />
                </div>
                <button className="close" onClick={this.props.callback}><i className="far fa-times-circle"></i></button>
            </div>

        )
    }
}
