import React from 'react';

export default class Card50 extends React.Component {
    render() {
        return (
            <div className="col-50">
                <div className="card">
                    <div className="mc-container">
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}