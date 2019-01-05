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
        this.props.item &&
            this.setState({
                id: this.props.item.id,
                name: this.props.item.name,
                balance: this.props.item.balance
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
            this.props.item &&
            <div className="account update ">
                <div>
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                </div>
                <div>
                    <input type="text" name="balance" onChange={this.handleChange} value={this.state.balance} />
                </div>
                <div>
                    <button className="submit link" onClick={this.submit}><i className="far fa-check-circle"></i></button>
                    <Delete id={this.props.item.id} callback={this.props.callback} />
                </div>
            </div>

        )
    }
}
