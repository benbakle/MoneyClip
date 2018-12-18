import React from 'react';
import Api from '../../services/Api';

export default class Delete extends React.Component {
    constructor(props) {
        super(props)
        this.delete = this.delete.bind(this);
        this.callback = this.callback.bind(this);
    }

    delete() {
        Api.delete("incomes", this.props.id).then(this.callback);
    }

    callback() {
        this.props.callback && this.props.callback();
    }

    render() {
        return (
            <div className="delete">
                <button className="link" onClick={this.delete}><i className="fas fa-minus-circle"></i></button>
            </div>
        );
    }
}
