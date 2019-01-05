import React from 'react';
import Api from '../../services/Api';
import Money from '../Money';

export default class View extends React.Component {
    render() {
        return (
            this.props.item &&
            <React.Fragment>
                <div className="description">{this.props.item.description}</div>
                <div className="amount"><Money value={this.props.item.amount} /></div>
            </React.Fragment>
        )
    }
}