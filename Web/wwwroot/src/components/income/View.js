import React from 'react';
import Money from '../Money';

export default class View extends React.Component {
    render() {
        return (
            this.props.item &&
            <div className="income">
                <div className="description">{this.props.item.description}</div>
                <div className="amount"><Money value={this.props.item.amount} /></div>
            </div>
        )
    }
}