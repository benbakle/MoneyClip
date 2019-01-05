import React from 'react';
import Api from '../../services/Api';
import Loading from '../Loading';
import Helpers from '../../Helpers';
import Money from '../Money';
import Moment from 'react-moment';
import View from '../account/View.js';

export default class Crud extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            fetching: true,
            inCreateMode: false,
            itemInEditMode: null
        }

        this.load = this.load.bind(this);
        this.fetch = this.fetch.bind(this);
        this.toggleCreateMode = this.toggleCreateMode.bind(this);
        this.enterEditMode = this.enterEditMode.bind(this);
        this.exitEditMode = this.exitEditMode.bind(this);
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
            inCreateMode: false,
            itemInEditMode: false
        }, this.fetch);
    }

    enterEditMode(index) {
        this.setState({
            itemInEditMode: index,
        })
    }

    exitEditMode() {
        this.setState({
            itemInEditMode: null
        })
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
                    !this.state.fetching && this.state.data && this.state.inCreateMode && this.props.create &&
                    React.cloneElement(this.props.create, { callback: this.callback })
                }
                {
                    !this.state.fetching && this.state.data &&
                    <React.Fragment>
                        <div className={this.props.type.slice(0, -1)} >
                            {displayListings(this.state.data, this.callback, this.props.update, this.props.view, this.state.itemInEditMode, this.enterEditMode, this.exitEditMode)}
                        </div>
                        {displayListingsTotal(this.state.data)}
                    </React.Fragment>
                }
            </div>
        )
    }
}

function displayListings(listings, callback, update, view, itemInEditMode, enterEditMode, exitEditMode) {
    return (
        listings.map((item, key) =>
            //<View account={item} />
            <React.Fragment key={key}>
                {
                    key !== itemInEditMode &&
                    <button className="edit link" onClick={() => { enterEditMode(key) }}>
                        {React.cloneElement(view, { item: item })}
                    </button>
                }
                {
                    key === itemInEditMode &&
                    <React.Fragment>
                        {React.cloneElement(update, { callback: callback, item: item })}
                        <button className="link close" onClick={exitEditMode}><i className='far fa-times-circle'></i></button>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    )
}

function displayItem(item) {
    let properties = Object.keys(item);
    let display = [];

    for (let i = 0; i < properties.length; i++) {
        display.push({ field: properties[i], value: item[properties[i]] });
    }

    return (
        display.map((item, key) => (
            item.field !== "id" && item.field !== "$id" && item.field !== "url" &&
            <div className={properties[key]} key={key}>
                {formatValue(item)}
            </div>
        ))
    )
}

function displayListingsTotal(listings) {
    return (
        <div className="listing-total">
            <div className="flex flex-end">
                <div>
                    Total: <Money value={Helpers.sumProperty(listings, 'amount')} />
                </div>
            </div>
        </div>
    )
}

function formatValue(item) {
    let value = item.value;
    let field = item.field;

    if (typeof value == 'number')
        return (<Money value={value} />);
    if (field == 'date')
        return (<Moment date={value} format="MMMM DD, YYYY" />);

    return value;
}