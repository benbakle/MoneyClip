import React from 'react';
//import Delete from './Delete';
//import Update from './Update';
import Money from '../Money';

export default class Transaction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inEditMode: false,
            transaction :{ description: "tlkj", amount: 53.88, date: "2018-01-01" }
        }

        this.enterEditMode = this.enterEditMode.bind(this);
        this.exitEditMode = this.exitEditMode.bind(this);
    }

    exitEditMode() {
        this.setState({ inEditMode: false});
    }

    enterEditMode() {
        this.setState({ inEditMode: true });
    }

    render() {
        return (
           // this.props.transaction &&
            <div className="transaction" >
                <div className="title">Transactions</div>
                {
                    !this.state.inEditMode &&
                    <React.Fragment>
                        <div className="date">{this.state.transaction.date}</div>
                        <button className="description link" onClick={this.enterEditMode}>{this.state.transaction.description}</button>
                        <Money className="amount" value={this.state.transaction.amount} />
                    </React.Fragment>
                }
                {
                    this.state.inEditMode &&
                        //<Update transaction={this.props.transaction} callback={this.props.callback} />
                        //<Delete id={this.props.transaction.id} callback={this.props.callback} />
                    <React.Fragment>
                        <div>
                            <button className="link close" onClick={this.exitEditMode}><i className='far fa-times-circle'></i></button>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}
