import React from 'react';
import Money from '../Money';
import Moment from 'react-moment';
import Notification from '../../services/Notification';
import StatusToggle from './StatusToggle';

export default class View extends React.Component {

    render() {
        return (
            this.props.item &&
            <React.Fragment>
                <div className="cell date desktop">
                    <Moment date={this.props.item.date} format="MMMM DD, YYYY" />
                </div>
                <div className="cell date mobile">
                    <Moment date={this.props.item.date} format="MM-DD-YY" />
                </div>
                <div className="cell description">{this.props.item.description}</div>
                <div className="cell amount"><Money value={this.props.item.amount} /></div>
                <StatusToggle callback={this.props.callback}  item={this.props.item} />
            </React.Fragment>
        )
    }
}