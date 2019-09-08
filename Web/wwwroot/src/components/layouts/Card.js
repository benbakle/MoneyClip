import React from 'react';

export default class Card extends React.Component {
    render() {
        const { col } = this.props;
        return (
            <div className={`col-${col}`}>
                <div className="card">
                    <div className="mc-container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}