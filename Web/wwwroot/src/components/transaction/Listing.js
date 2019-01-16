import React from 'react';
import View from './View';
import Update from './Update';
import Create from './Create';
import ListingLayout from '../layouts/Listing';
import Card100 from '../layouts/Card100';
import Crud from '../layouts/Crud';
import Card50 from '../layouts/Card50';

export default class Listing extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cleared: false }
    }
    render() {
        return (
            <div className="grid">
                <div className="mc-container">
                    <div className="title">Transactions</div>

                    <Card100 content={
                        <Crud
                            view={<View />}
                            create={<Create />}
                            update={<Update />}
                            type="transactions"
                            filter={`$filter=cleared eq ${this.state.cleared}&$orderBy=date`}
                        />
                    }
                    />
                </div>
            </div>
        )
    }
}