import React from 'react';
import Crud from '../layouts/Crud';
import View from './View';
import Create from './Create';
import Update from './Update';
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
                    type="accounts"
                    filter="$orderby=type desc"
                />
            </div>
        )
    }
}