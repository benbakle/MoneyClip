import React from 'react';
import Api from '../../services/Api';
//import Calendar from 'react-calendar';
import Moment from 'react-moment';
import Delete from './Delete';


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
        this.props.callback && this.props.callback();
    }

    render() {
        return (
            this.props.item &&
            <React.Fragment>
                {
                    //<Moment date={this.state.date} format="dddd, MMMM Do YYYY" />
                }
                <div>
                    <input type="date" name="date" onChange={this.handleChange} value={this.state.date} />
                </div>
                {
                    //<Calendar date={this.state.date} format="dddd, MMMM Do YYYY" />
                }
                <div>
                    <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                </div>
                <div>
                    <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />
                </div>
                <button className="submit link" onClick={this.submit}><i className="far fa-check-circle"></i></button>
                <Delete id={this.props.item.id} callback={this.props.callback} />
            </React.Fragment>

        )
    }
}
