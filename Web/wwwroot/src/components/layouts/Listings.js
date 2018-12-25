import React from 'react';
import Api from '../../services/Api';
import Loading from '../Loading';
//import Create from './Create';
import Helpers from '../../Helpers';
import Money from '../Money';

export default class Listings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            fetching: true,
            inCreateMode: false
        }

        this.load = this.load.bind(this);
        this.fetch = this.fetch.bind(this);
        this.toggleCreateMode = this.toggleCreateMode.bind(this);
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
        Api.fetch(this.props.type, this.props.orderBy).then(this.load);
    }

    toggleCreateMode() {
        this.setState({
            inCreateMode: !this.state.inCreateMode
        })
    }

    callback() {
        this.setState({
            fetching: true,
            inCreateMode: false
        }, this.fetch);
    }

    render() {
        return (
            <div className={this.props.type}>
                <div className="flex space-between">
                    <div className="title">{this.props.type}</div>
                    <button className="create link" onClick={this.toggleCreateMode}>
                        {this.state.inCreateMode ? <i className='far fa-times-circle'></i> : <i className="fas fa-plus-circle"></i>}
                    </button>
                </div>
                {
                    this.state.fetching &&
                    <Loading />
                }
                {
                    //!this.state.fetching && this.state.data && this.state.inCreateMode &&
                    //<Create callback={this.callback} />
                }
                {
                    !this.state.fetching && this.state.data &&
                    <React.Fragment>
                        {displayListings(this.state.data, this.callback)}
                        {displayListingsTotal(this.state.data)}
                    </React.Fragment>
                }
            </div>
        )
    }
}

function displayListings(listings, callback) {
    return (
        listings.map((item, key) =>
            <div key={key} className="flex space-between align-center">
                {displayItem(item)}
            </div>
        )
    )
}

function displayItem(item) {
    let properties = Object.keys(item);
    let display = [];

    for (let i = 1; i < properties.length; i++) {
        display.push(item[properties[i]]);
    }

    return (
        display.map((item, key) => (
            <div key={key} className={properties[key+1]}>
                {item}
            </div>
        ))
    )
}

function displayListingsTotal(listings) {
    return (
        <div className="listing-total">
            <div className="flex flex-end">
                <div>
                    Total: <Money value={Helpers.sumProperty(listings, 'balance')} />
                </div>
            </div>
        </div>
    )
}