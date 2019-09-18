import React from 'react';
import Transactions from '../../services/Transactions';
import Loading from '../Loading';
import Moment from 'react-moment';
import CrudToggle from '../CrudToggle';
import StatusToggle from './StatusToggle';
import View from './View';
import Update from './Update';
import Create from './Create';
import Crud from '../layouts/Crud';
import ListingHeader from './ListingHeader';

export default class Listing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            transactions: null,
            descriptions: null,
            inEditMode: false,
        }
    }

    componentDidMount() {
        this.mounted = true;
        if (Transactions.fetching === false)
            this.load();
        Transactions.subscribe(this.load);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    load = () => {
        this.setMountedState({
            fetching: false,
            transactions: Transactions.transactions,
            descriptions: Transactions.descriptions,
        });
    }

    toggleEditMode = () => {
        this.setState({ inEditMode: !this.state.inEditMode })
    }

    setMountedState = (state, callback) => {
        if (this.mounted)
            this.setState(state, callback && callback());
    }

    render() {
        const { transactions, fetching, inEditMode, descriptions } = this.state;
        return (
            <div className="transactions">
                {
                    fetching && !transactions &&
                    <Loading />
                }
                {
                    <Crud
                        view={<View />}
                        create={<Create />}
                        update={<Update />}
                        header={<ListingHeader />}
                        type="transactions"
                        items={transactions}
                        filter={this.state.filter}
                    />
                }
            </div>
        )
    }
}
