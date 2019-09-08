import React from 'react';
import Balance from './Balance';

export default class Dashcard extends React.Component {
    render() {
        return (
            <div className="grid">
                <div className="mc-container">
                    <Balance />
                </div>
            </div>
        );
    }
}
