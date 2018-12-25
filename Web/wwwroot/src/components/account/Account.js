import React from 'react';
import Moment from 'react-moment';
import Money from '../Money';
import Update from './Update';


export default class Account extends React.Component {
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
        this.props.account && this.init()
    }

    init() {
        this.setState({
            date: this.props.account.date
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
            this.props.account &&
            <div className="account" >
                {
                    !this.state.inEditMode &&
                    <button className="edit link flex space-between align-center" onClick={this.enterEditMode}>
                        <div className="name">{this.props.account.name}</div>
                        <div className="balance"><Money value={this.props.account.balance} /></div>
                    </button>
                }
                {
                    this.state.inEditMode &&
                    <div className="flex space-between align-center">
                        {
                        <Update account={this.props.account} callback={this.props.callback} />
                        }
                       <button className="link close" onClick={this.exitEditMode}><i className='far fa-times-circle'></i></button>
                    </div>
                }
            </div>
        );
    }
}

