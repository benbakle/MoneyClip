import React from 'react';
import Api from '../../services/Api';
import Calendar from 'react-calendar';
import Moment from 'react-moment';
//import Delete from './Delete';
import Notification from '../../services/Notification';
import StatusToggle from './StatusToggle';

export default class Update extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            date: null,
            description: null,
            amount: null,
            cleared: false
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
                amount: this.props.item.amount,
                cleared: this.props.item.cleared
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
        Api.update("transactions", this.state.id, this.state).then(this.callback);
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
            <React.Fragment>
                {
                    //<Calendar date={this.state.date} format="dddd, MMMM Do YYYY" />
                    //<Moment date={this.state.date} format="MMMM DD, YYYY" />
                }
                <div className="cell date input-wrapper">
                    <input type="date" name="date" onChange={this.handleChange} value={this.state.date} />
                </div>
                {
                }
                <div className="cell description input-wrapper">
                    <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                </div>
                <div className="cell amount  input-wrapper">
                    <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />
                </div>
                <StatusToggle callback={this.props.callback} cleared={this.state.cleared} />
                <button className="close" onClick={this.props.callback}><i className="far fa-times-circle"></i></button>
            </React.Fragment>
        )
    }
}
