﻿import React from 'react';

export default class Card100 extends React.Component {
    render() {
        return (
            <div className="col-100">
                <div className="card">
                    <div className="mc-container">
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}