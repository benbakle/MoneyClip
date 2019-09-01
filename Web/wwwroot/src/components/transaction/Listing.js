import React from 'react';
import View from './View';
import Update from './Update';
import Create from './Create';
import Card100 from '../layouts/Card100';
import Crud from '../layouts/Crud';
import ListingHeader from './ListingHeader';
import Balance from '../Balance';
import Api from '../../services/Api';
import Card50 from '../layouts/Card50';

export default class Listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cleared: false,
            payees: [],
            payee: "",
            fetching: true,
            filter: "",
            orderBy: 'date'// desc'
        }

        this.handleFilters = this.handleFilters.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.load = this.load.bind(this);
    }

    componentDidMount() {
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

    handleFilters() {
        let filters = [];

        if (this.state.cleared !== "")
            filters.push(`cleared eq ${this.state.cleared}`)

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
            <div className="">
                <div className="grid">
                    <div className="flex-row">
                        <div className="col-30">
                            <div className="card">
                                <Balance />
                            </div>
                        </div>
                        <div className="col-70">
                            <div className="input-wrapper">
                                <select onChange={this.handleChange} value={this.state.cleared} name="cleared">
                                    <option value="">All</option>
                                    <option value={true} >Cleared</option>
                                    <option value={false}>Pending</option>
                                </select>
                            </div>
                            {
                                !this.state.fetching && this.state.payees &&
                                <div className="input-wrapper">
                                    <select onChange={this.handleChange} value={this.state.payee} name="payee">
                                        <option value="">All Payees</option>
                                        {this.state.payees.map((item, key) =>
                                            <option value={item} key={key}>{item}</option>
                                        )}
                                    </select>
                                </div>
                            }
                            <Crud
                                view={<View />}
                                create={<Create />}
                                update={<Update />}
                                header={<ListingHeader />}
                                type="transactions"
                                filter={this.state.filter}
                            />

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}