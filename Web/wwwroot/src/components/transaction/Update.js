import React from 'react';
import Api from '../../services/Api';
import Calendar from 'react-calendar';
import Moment from 'react-moment';

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
        //this.callback = this.callback.bind(this);
    }

    componentDidMount() {
        this.props.transaction &&
            this.setState({
                id: this.props.transaction.id,
                date: this.props.transaction.date,
                description: this.props.transaction.description,
                amount: this.props.transaction.amount
            });
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    submit() {
        //   Api.update("transactions", this.state.id, this.state).then(this.callback);
    }

    callback() {
        this.props.callback && this.props.callback();
    }

    render() {
        return (
            this.props.transaction &&
            <React.Fragment>
                    {
                    <Moment date={this.state.date} format="dddd, MMMM Do YYYY"/>
                    //<Calendar date={this.state.date} format="dddd, MMMM Do YYYY" />
                    }
                    <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                    <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />
                <div>
                    <button className="submit link" onClick={this.submit}><i className="far fa-check-circle"></i></button>
                </div>
            </React.Fragment>

        )
    }
}
