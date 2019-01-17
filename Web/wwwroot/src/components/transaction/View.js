import React from 'react';
import Money from '../Money';
import Moment from 'react-moment';
import Notification from '../../services/Notification';

export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm: false
        }

        this.confirm = this.confirm.bind(this);
        this.clear = this.clear.bind(this);
    }

    confirm() {
        this.setState({ confirm: true })
    }

    clear() {
        this.setState({ confirm: false})
        this.props.callback();
        Notification.success({ text: "Cleared!" });
    }

    render() {
        return (
            this.props.item &&
            <div className="transaction">
                <div className="date">
                    <Moment date={this.props.item.date} format="MMMM DD, YYYY" />
                </div>
                <div className="description">{this.props.item.description}</div>
                <div className="amount"><Money value={this.props.item.amount} /></div>
                <div className="status">
                    {
                        !this.props.item.cleared &&
                        <div className="status-toggle">
                            {
                                !this.state.confirm ?
                                    <button onClick={this.confirm} className="link"><span className="small">clear</span></button> :
                                    <button onClick={this.clear} className="link"><i className="fa fa-check"></i></button>

                            }
                        </div>
                    }
                    {
                        this.props.item.cleared &&
                        <div className="link">
                            <i className="fa fa-check"></i>
                        </div>
                    }
                </div>
            </div>
        )
    }
}