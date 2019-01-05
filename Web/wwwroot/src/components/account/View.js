import React from 'react';
import Api from '../../services/Api';
import Money from '../Money';

export default class View extends React.Component {
    render() {
        return (
            this.props.item &&
            <div className="account">
                <div className="name">{this.props.item.name}</div>
                <div className="balance"><Money value={this.props.item.balance} /></div>
            </div>
        )
    }
}