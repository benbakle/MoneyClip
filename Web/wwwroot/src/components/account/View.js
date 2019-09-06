import React from 'react';
import Money from '../Money';

export default class View extends React.Component {
    render() {
        return (
            this.props.item &&
            <div className="account">
                <div className="cell name">{this.props.item.name}</div>
                <div className="cell type">{this.props.item.accountType}</div>
                <div className="cell balance"><Money value={this.props.item.balance} /></div>
            </div>
        )
    }
}