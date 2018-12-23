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
        this.fetch = this.fetch.bind(this);
        this.callback = this.callback.bind(this);

        this.fetch();
    }

    load(data) {
        this.setState({
            data: data,
            fetching: false
        })
    };

    fetch() {
        Api.fetch("transactions").then(this.load);
    }

    callback() {
        this.setState({
            fetching: true,
            //inAddMode: false
        }, this.fetch);
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
                        <Transaction transaction={item} key={key} callback={this.callback} />
                    )
                }
            </div>
        )
    }
}