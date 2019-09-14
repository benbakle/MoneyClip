import React from 'react';
import Api from '../../services/Api';
import Notification from '../../services/Notification';
import StatusToggle from './StatusToggle';
import Account from '../../services/Account';

export default class Update extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            descriptionList: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.callback = this.callback.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        if (Account.transactions())
            this.loadList();
        Account.subscribe(this.loadList);
        this.props.item &&
            this.setState({ ...this.props.item });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    setMountedState = (state, callback) => {
        if (this.mounted)
            this.setState(state, callback && callback());
    }

    loadList = () => {
        let items = this.objectPropertyArray(Account.transactions().items, "description");
        this.setMountedState({ descriptionList: items })
    }

    objectPropertyArray = (array, propertyName) => {
        return [...new Set(array.map(i => i[propertyName]))];
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
                <div className="input-wrapper cell description">
                    {
                        this.state.descriptionList &&
                        <select value={this.state.description} name="description" onChange={this.handleChange}>
                            {
                                this.state.descriptionList.map((item, key) =>
                                    <option value={item.trim()} key={key}>{item}</option>
                                )
                            }

                        </select>
                    }
                </div>
                <div className="cell number input-wrapper">
                    <input type="text" name="number" onChange={this.handleChange} value={this.state.number} />
                </div>
                <div className="cell amount  input-wrapper">
                    <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />
                </div>
                <StatusToggle callback={this.props.callback} item={this.state} />
                <button className="close" onClick={this.props.callback}><i className="far fa-times-circle"></i></button>
            </React.Fragment>
        )
    }
}
