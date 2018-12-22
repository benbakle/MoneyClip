import React from 'react';
import Moment from 'react-moment';
import Money from '../Money';


export default class Transation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inEditMode: false
        }

        this.enterEditMode = this.enterEditMode.bind(this);
        this.exitEditMode = this.exitEditMode.bind(this);
    }

    exitEditMode() {
        this.setState({ inEditMode: false });
    }

    enterEditMode() {
        this.setState({ inEditMode: true });
    }

    render() {
        return (
            // this.props.income &&
            <div className="transaction" >
                {
                    !this.state.inEditMode &&
                    <React.Fragment>
                        <button className="link date" onClick={this.enterEditMode}><Moment date={this.props.data.date} format="MM/DD/YYYY" /></button>
                        <button className="link description" onClick={this.enterEditMode}>{this.props.data.description}</button>
                        <button className="link amount" onClick={this.enterEditMode}><Money value={this.props.data.amount} /></button>
                    </React.Fragment>
                }
                {
                    this.state.inEditMode &&
                    <React.Fragment>
                        <div>
                            <input className="description" type="text" value={this.props.data.description} />
                            <button className="link close" onClick={this.exitEditMode}><i className='far fa-times-circle'></i></button>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}


