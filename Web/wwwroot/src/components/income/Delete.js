import React from 'react';
import Api from '../../services/Api';

export default class Delete extends React.Component {
    constructor(props) {
        super(props)
        this.delete = this.delete.bind(this);
    }

    delete() {
        Api.delete("incomes", this.props.id).then(this.props.callback);
    }

    render() {
        return (
            <div>
                <button onClick={this.delete}>delete</button>
            </div>
        );
    }
}
