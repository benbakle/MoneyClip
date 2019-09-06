﻿import React from 'react';
import Api from '../../services/Api';
//import Calendar from 'react-calendar';
//import Moment from 'react-moment';
//import Delete from './Delete';


export default class Update extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: "",
            type: "",
            balance: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.callback = this.callback.bind(this);
    }

    componentDidMount() {
        this.props.item &&
            this.setState({
                id: this.props.item.id,
                name: this.props.item.name,
                type: this.props.item.type,
                balance: this.props.item.balance
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
        Api.update("accounts", this.state.id, this.state).then(this.callback);
    }

    callback() {
        this.props.callback && this.props.callback();
    }

    render() {
        return (
            this.props.item &&
            <div className="account update ">
                <div className="cell name input-wrapper">
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                </div>
                <div className="cell type select-wrapper">
                    <select type="text" name="type" onChange={this.handleChange} value={this.state.type} >
                        <option value="Credit">credit</option>
                        <option value="Checking">checking</option>
                        <option value="Savings">savings</option>
                    </select>
                </div>
                <div className="cell balance input-wrapper">
                    <input type="text" name="balance" onChange={this.handleChange} value={this.state.balance} />
                </div>
                <button className="close" onClick={this.props.callback}><i className="far fa-times-circle"></i></button>
            </div>

        )
    }
}
