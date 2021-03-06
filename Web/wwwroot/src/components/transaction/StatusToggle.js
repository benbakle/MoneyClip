﻿import React from 'react';
import Notification from '../../services/Notification';
import Api from '../../services/Api';

export default class StatusToggle extends React.Component {
    constructor(props) {
        super(props);

        this.toggleClear = this.toggleClear.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    toggleClear() {
        Api.fetch(`/api/transactions/toggleStatus/${this.props.item.id}`, { method: 'PUT' }).then(() => {
            this.props.callback();
            Notification.success({ text: `${this.props.item.description} status has been updated to ${generateStatusText(this.props.item.cleared)}.` });
        })
    }

    handleEnter(e) {
        if (e.keyCode === 13)
            this.toggleClear();
    }

    render() {
        return (
            <React.Fragment>
                <div className="cell status">
                    {
                        !this.props.item.cleared &&
                        <div className="status-toggle">
                            <button onKeyUp={this.handleEnter} className="link"><i className="far fa-square"></i></button>
                            <button onClick={this.toggleClear} className="link"><i className="fa fa-check"></i></button>
                        </div>
                    }
                    {
                        this.props.item.cleared &&
                        <div className="status-toggle">
                            <button onKeyUp={this.handleEnter} className="link"><i className="fa fa-check"></i></button>
                            <button onClick={this.toggleClear} className="link"><i className="far fa-square"></i></button>
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

function generateStatusText(cleared) {
    return cleared ? "'PENDING'" : "'CLEARED'";
}