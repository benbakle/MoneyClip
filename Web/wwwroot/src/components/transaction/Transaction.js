import React from 'react';
import Moment from 'react-moment';
import Money from '../Money';
import Calendar from 'react-calendar';
import Create from './Create';


export default class Transation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inEditMode: false,
            date: new Date()
        }

        this.init = this.init.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.enterEditMode = this.enterEditMode.bind(this);
        this.exitEditMode = this.exitEditMode.bind(this);
    }

    componentWillMount() {
        this.props.transaction && this.init()
    }

    init() {
        this.setState({
            date: this.props.transaction.date
        })
    }

    exitEditMode() {
        this.setState({ inEditMode: false });
    }

    enterEditMode() {
        this.setState({ inEditMode: true });
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    render() {
        return (
            this.props.transaction &&
            <div className="transaction flex space-between align-center" >
                {
                    !this.state.inEditMode &&
                    <div>
                        <button className="link date" onClick={this.enterEditMode}><Moment date={this.state.date} format="MM/DD/YYYY" /></button>
                        <button className="link description" onClick={this.enterEditMode}>{this.props.transaction.description}</button>
                        <button className="link amount" onClick={this.enterEditMode}><Money value={this.props.transaction.amount} /></button>
                    </div>
                }
                {
                    this.state.inEditMode &&
                    <React.Fragment>
                        <Create transaction={this.props.transaction} />
                        <div>
                            <button className="link close" onClick={this.exitEditMode}><i className='far fa-times-circle'></i></button>
                        </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}

                           