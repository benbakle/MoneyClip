import React from 'react';
import Card100 from '../layouts/Card100';
import Crud from '../layouts/Crud';
import View from './View';
import Create from './Create';
import Update from './Update';
import ListingHeader from './ListingHeader';

export default class Listing extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="accounts">
                    <div className="account">

                    </div>
                </div>
                <Card100 content={
                    <Crud
                        view={<View />}
                        create={<Create />}
                        update={<Update />}
                        header={<ListingHeader/>}
                        type="accounts"
                    />
                }
                />
            </React.Fragment>

        )
    }
}