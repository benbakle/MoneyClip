import React from 'react';
import Balance from './Balance';
import Card50 from './layouts/Card50';

export default class Dashcard extends React.Component {
    render() {
        return (
            <div className="grid">
                <div className="mc-container">
                    <div className="flex-row">
                        <Card50 content={<Balance />} className="balance" />
                    </div>
                </div>
            </div>
        );
    }
}
