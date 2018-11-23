import React from 'react';

export default class BoardCard extends React.Component {
    render() {
        return (
            <div className="board">
                <div className="mc-container">
                    {this.props.card}
                </div>
            </div>
        );
    }
}