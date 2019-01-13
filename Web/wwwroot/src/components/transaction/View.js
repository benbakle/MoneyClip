import React from 'react';
import Money from '../Money';
import Moment from 'react-moment';

export default class View extends React.Component {
    render() {
        return (
            this.props.item &&
            <div className="transaction">
                <div className="date">
                    <Moment date={this.props.item.date} format="MMMM DD, YYYY" />
                </div>
                <div className="description">{this.props.item.description}</div>
                <div className="amount"><Money value={this.props.item.amount} /></div>
            </div>
        )
    }
}