import React from 'react';
import View from './View';
import Update from './Update';
import Create from './Create';
import ListingLayout from '../layouts/Listing';
import Card100 from '../layouts/Card100';
import Crud from '../layouts/Crud';
import Card50 from '../layouts/Card50';
import ListingHeader from './ListingHeader';

export default class Listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cleared: false,
            filter: "$filter=cleared eq false&$orderBy=date"
        }

        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(e) {
        this.setState({ filter: `$filter=cleared eq ${e.target.value}&$orderBy=date`, cleared: e.target.value });
    }
    render() {
        return (
            <React.Fragment>
                    <select onChange={this.handleFilter} value={this.state.cleared}>
                        <option value={true} >Cleared</option>
                        <option value={false}>Pending</option>
                    </select>
                    <Card100 content={
                        <Crud
                            view={<View />}
                            create={<Create />}
                            update={<Update />}
                            header={<ListingHeader />}
                            type="transactions"
                            filter={this.state.filter}
                        />
                    }
                    />
            </React.Fragment>

        )
    }
}