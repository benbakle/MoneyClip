import React from 'react';
import View from './View';
import Create from './Create';
import Update from './Update';
import Crud from '../layouts/Crud';
import ListingHeader from './ListingHeader';

export default class Listing extends React.Component {
    render() {
        return (
            <div className="mc-container">
                <Crud
                    view={<View />}
                    create={<Create />}
                    update={<Update />}
                    header={<ListingHeader />}
                    type="incomes"
                />
            </div>
        )
    }
}
