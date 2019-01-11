﻿import React from 'react';
import Api from '../../services/Api';

export default class Delete extends React.Component {
    constructor(props) {
        super(props)
        this.delete = this.delete.bind(this);
        this.callback = this.callback.bind(this);
    }

    delete() {
        Api.delete("accounts", this.props.id).then(this.callback);
    }

    callback() {
        this.props.callback && this.props.callback();
    }

    render() {
        return (
            <React.Fragment>
                <button className="link delete" onClick={this.delete}><i className="fas fa-minus-circle"></i></button>
            </React.Fragment>
        );
    }
}