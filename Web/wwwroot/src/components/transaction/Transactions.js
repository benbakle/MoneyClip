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
    //constructor(props) {
    //    super(props);

    //    this.state = {
    //        inEditMode: false,
    //        transaction :{ description: "tlkj", amount: 53.88, date: "2018-01-01" }
    //    }

    //    this.enterEditMode = this.enterEditMode.bind(this);
    //    this.exitEditMode = this.exitEditMode.bind(this);
    //}

    //exitEditMode() {
    //    this.setState({ inEditMode: false});
    //}

    //enterEditMode() {
    //    this.setState({ inEditMode: true });
    //}

        //    return (
        //        <div className="transaction" >
        //            <div className="title">Transactions</div>
        //            {
        //                //!this.state.inEditMode &&
        //                //<React.Fragment>
        //                //    <div className="date">{this.state.transaction.date}</div>
        //                //    <button className="description link" onClick={this.enterEditMode}>{this.state.transaction.description}</button>
        //                //    <Money className="amount" value={this.state.transaction.amount} />
        //                //</React.Fragment>
        //            }
        //            {
        //                //this.state.inEditMode &&
        //                //<React.Fragment>
        //                //    <div>
        //                //        <input className="description" type="text" value={this.state.transaction.description} />
        //                //        <button className="link close" onClick={this.exitEditMode}><i className='far fa-times-circle'></i></button>
        //                //    </div>
        //                //</React.Fragment>
        //            }
        //        </div>
        //    );

