import React from 'react';
import Money from '../Money';
import Moment from 'react-moment';
import Notification from '../../services/Notification';

export default class View extends React.Component {
    constructor(props) {
        super(props);

        this.clear = this.clear.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    clear() {
        this.props.callback();
        Notification.success({ text: "Cleared!" });
    }

    handleEnter(e) {
       if (e.keyCode === 13)
           this.clear() ;
    }

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
                <div className="cell status">
                    {
                        !this.props.item.cleared &&
                        <div className="status-toggle">
                            <button onKeyUp={this.handleEnter} className="link"><i className="far fa-square"></i></button>
                            <button onClick={this.clear} className="link"><i className="fa fa-check"></i></button>
                        </div>
                    }
                    {
                        this.props.item.cleared &&
                        <div className="link">
                            <i className="fa fa-check"></i>
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}