import React from 'react';
import Api from '../../services/Api';
import History from '../../services/History';


export default class Delete extends React.Component {

    constructor(props) {
        super(props)
        this.delete = this.delete.bind(this);
    }

    delete() {
        Api.deleteIncome(this.props.id)
        History.push(window.location.pathname + window.location.search);
    }

    render() {
        return (
            <div>
                <button onClick={this.delete}>delete</button>
            </div>
        );
    }
}
