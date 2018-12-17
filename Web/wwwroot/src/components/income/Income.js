import React from 'react';
import Delete from './Delete';
import Update from './Update';
import Money from '../Money';

export default class Income extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inEditMode: false,
        }
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleEdit() {
        this.setState({ inEditMode: !this.state.inEditMode });
    }

    render() {
        return (
            <div className="income">
                {
                    !this.state.inEditMode &&
                    <React.Fragment>
                        <div className="description">{this.props.income.description}</div>
                        <Money className="amount" value={this.props.income.amount} />
                    </React.Fragment>
                }
                {
                    this.state.inEditMode &&
                    <React.Fragment>
                        <Update income={this.props.income} callback={this.props.callback} />
                        <Delete id={this.props.income.incomeID} callback={this.props.callback} />
                    </React.Fragment>
                }
                <div>
                    <button className="link" onClick={this.toggleEdit}>{this.state.inEditMode ? <i class='far fa-times-circle'></i> : <i class="far fa-edit"></i>}</button>
                </div>
            </div>
        );
    }
}
