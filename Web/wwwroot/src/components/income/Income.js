import React from 'react';
import Delete from './Delete';
import Update from './Update';
import Money from '../Money';

export default class Income extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inEditMode: false
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
            this.props.income &&
            <div className="income" >
                {
                    !this.state.inEditMode &&
                    <React.Fragment>
                        <button className="description link" onClick={this.enterEditMode}>{this.props.income.description}</button>
                        <Money className="amount" value={this.props.income.amount} />
                    </React.Fragment>
                }
                {
                    this.state.inEditMode &&
                    <React.Fragment>
                        <Update income={this.props.income} callback={this.props.callback} />
                        <Delete id={this.props.income.id} callback={this.props.callback} />
                        <div>
                            <button className="link close" onClick={this.exitEditMode}><i className='far fa-times-circle'></i></button>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}
