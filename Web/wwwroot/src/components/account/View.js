﻿import React from 'react';
import Money from '../Money';

export default class View extends React.Component {
    render() {
        return (
            this.props.item &&
            <>
                <div className="cell name">{this.props.item.name}</div>
                <div className="cell type">{this.props.item.type}</div>
                <div className="cell balance"><Money value={this.props.item.balance} /></div>
                <div className="cell balance"><Money value={this.props.item.offset * -1} /></div>
            </>
        )
    }
}