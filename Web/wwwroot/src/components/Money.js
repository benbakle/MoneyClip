import React from 'react';

export default class Money extends React.Component {
    render() {
        return (
            (this.props.value || (this.props.value === 0)) &&
            <span className="money">
                ${this.props.value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>

        );
    }
}