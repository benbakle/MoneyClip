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
            name: "",
            balance: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.callback = this.callback.bind(this);
    }

    componentDidMount() {
        this.props.account &&
            this.setState({
                id: this.props.account.id,
                name: this.props.account.name,
                balance: this.props.account.balance
            });
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
            this.props.account &&
            <React.Fragment>
                <div>
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                </div>
                <div>
                    <input type="text" name="balance" onChange={this.handleChange} value={this.state.balance} />
                </div>
                <button className="submit link" onClick={this.submit}><i className="far fa-check-circle"></i></button>
                <Delete id={this.props.account.id} callback={this.props.callback} />
            </React.Fragment>

        )
    }
}
