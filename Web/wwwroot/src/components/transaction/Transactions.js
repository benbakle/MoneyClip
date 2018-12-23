import React from 'react';
import Api from '../../services/Api';
import Loading from '../Loading';
import Transaction from './Transaction';

export default class Transactions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            fetching: true,
        }

        this.load = this.load.bind(this);

        Api.fetch("transactions").then(this.load);
    }

    load(data) {
        this.setState({
            data: data,
            fetching: false
        })
    }

    render() {
        return (
            <div>
                <div className="title">Transactions</div>
                {
                    this.state.fetching &&
                    <Loading />
                }
                {
                    !this.state.fetching && this.state.data &&
                    this.state.data.map((item, key) =>
                        <Transaction transaction={item} key={key} />
                    )
                }
            </div>
        )
    }
}