import React from 'react';
import Card100 from '../layouts/Card100';
import View from './View';
import Create from './Create';
import Update from './Update';
import Crud from '../layouts/Crud';

export default class Listing extends React.Component {
    render() {
        return (
            <div className="grid">
                <div className="mc-container">
                    <Card100 content={
                        <Crud
                            view={<View />}
                            create={<Create />}
                            update={<Update />}
                            type="incomes"
                        />
                    }
                    />
                </div>
            </div>
        )
    }
}
