import React from 'react';
import View from './View';
import Update from './Update';
import Create from './Create';
import Crud from '../layouts/Crud';
import ListingHeader from './ListingHeader';
import Api from '../../services/Api';
import moment from 'moment';
import Money from '../Money';
import Transactions from '../../services/Transactions';

export default class Listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            payees: [],
            payee: "",
            fetching: true,
            filter: "",
            orderBy: 'cleared',
            fundsNeeded: 0,
        }

        this.handleFilters = this.handleFilters.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.load = this.load.bind(this);
    }

    componentDidMount() {
        Transactions.subscribe(this.loadfundsNeeded);
        this.handleFilters();
        this.fetchPayees();

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, this.handleFilters);
    }

    fetchPayees() {
        Api.fetch('/api/transactions/payees').then(this.load);
    }

    load(data) {
        this.setState({ payees: data, fetching: false });
    }

    loadfundsNeeded = () => {
        this.setState({ fundsNeeded: Transactions.fundsNeeded });
    }

    handleFilters() {
        let filters = [];

        filters.push(`date ge ${moment().add(-2, 'month').toISOString()} and date le ${moment().add(1, 'month').toISOString()}`);

        if (this.state.payee !== "")
            filters.push(`description eq '${this.state.payee}'`)

        if (filters.length)
            this.updateFilter(`$filter=` + filters.join(" and  ") + `&$orderBy=${this.state.orderBy}`)
        else
            this.updateFilter(`$orderBy=${this.state.orderBy}`)
    }

    updateFilter(filter) {
        this.setState({ filter: filter })
    }

    render() {
        return (
            <>
                <Crud
                    view={<View />}
                    create={<Create />}
                    update={<Update />}
                    header={<ListingHeader />}
                    type="transactions"
                    filter={this.state.filter}
                />
            </>
        )
    }
}