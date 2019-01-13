import React from 'react';
import Api from '../../services/Api';
//import Calendar from 'react-calendar';
import Moment from 'react-moment';
import Delete from './Delete';
import Notification from '../../services/Notification';

export default class Update extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            date: "",
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
                date: this.props.item.date,
                description: this.props.item.description,
                amount: this.props.item.amount
            });
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    submit() {
        Api.update("transactions", this.state.id, this.state).then(this.callback);
    }

    callback() {
        this.props.callback();
        Notification.success({ text: "Updated!" })
    }

    componentWillReceiveProps(props) {
        if (props.inUpdateMode)
            this.submit();
    }

    render() {
        return (
            this.props.item &&
            <div className="transaction">
                {
                    //<Moment date={this.state.date} format="dddd, MMMM Do YYYY" />
                }
                <div className="date">
                    <input type="date" name="date" onChange={this.handleChange} value={this.state.date} />
                </div>
                {
                    //<Calendar date={this.state.date} format="dddd, MMMM Do YYYY" />
                }
                <div className="description">
                    <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                </div>
                <div className="amount">
                    <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />
                </div>
            </div>
        )
    }
}
