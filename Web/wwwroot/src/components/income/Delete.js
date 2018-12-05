import React from 'react';
import Api from '../../services/Api';


export default class Delete extends React.Component {

    render() {
        return (
            <div>
                <button onClick={() => Api.deleteIncome(this.props.id)}>delete</button>
            </div>
        );
    }
}
