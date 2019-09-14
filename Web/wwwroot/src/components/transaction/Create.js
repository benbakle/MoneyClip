import React from 'react';
import Api from '../../services/Api';
import Account from '../../services/Account';

export default class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: "",
            description: "",
            number: "",
            amount: "",
            cleared: false,
            descriptionList: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        if (Account.transactions())
            this.loadList();
        Account.subscribe(this.loadList);
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
        this.setMountedState({ descriptionList: items, description: items[0] })
    }

    objectPropertyArray = (array, propertyName) => {
        return [...new Set(array.map(i => i[propertyName]))];
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    submit() {
        let transaction = { Date: this.state.date, Description: this.state.description, Amount: this.state.amount, Number: this.state.number };
        Api.create("transactions", transaction).then(this.props.callback);
        this.clear();
    }

    isValid = () => {
        const { date, description, number, amount } = this.state;
        return date && description && number && amount;
    }

    clear = () => {
        this.setState({
            date: "",
            description: this.state.descriptionList[0],
            number: "",
            amount: "",
            cleared: false,
        })
    }

    formIsPariallyFilled = () => {
        const { date, description, number, amount } = this.state;
        return date || number || amount;
    }

    render() {
        return (
            <>
                <div className="input-wrapper cell date desktop">
                    <input type="date" name="date" onChange={this.handleChange} value={this.state.date} />
                </div>
                <div className="input-wrapper cell date mobile">
                    <input type="date" name="date" onChange={this.handleChange} value={this.state.date} />
                </div>

                <div className="input-wrapper cell description">
                    {
                        this.state.descriptionList &&
                        <select value={this.state.description} name="description" onChange={this.handleChange}>
                            {
                                this.state.descriptionList.map((item, key) =>
                                    <option value={item} key={key}>{item}</option>
                                )
                            }

                        </select>
                        //<input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
                    }
                </div>
                <div className="input-wrapper cell number">
                    <input type="text" name="number" onChange={this.handleChange} value={this.state.number} />
                </div>
                <div className="input-wrapper cell amount">
                    <input type="text" name="amount" onChange={this.handleChange} value={this.state.amount} />
                </div>

                <div className="button-wrapper status">
                    {
                        this.isValid() &&
                        <button className="button submit" onClick={this.submit}>Add</button>
                    }

                    {
                        this.formIsPariallyFilled() &&
                        <button className="button clear" onClick={this.clear}>Clear</button>
                    }
                </div>

            </>
        );
    }
}
