import React from 'react';
import Api from '../../services/Api';
import Loading from '../Loading';
import Helpers from '../../Helpers';
import Money from '../Money';
import Moment from 'react-moment';
import View from '../account/View.js';
import CrudToggle from '../CrudToggle';

export default class Crud extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: this.props.type,
            orderby: this.props.orderby,
            view: this.props.view,
            update: this.props.update,
            create: this.props.create,
            fetching: true,
            items: null,
            inEditMode: false,
            inCreateMode: false,
            itemInEditMode: -1

        }

        this.fetchItems = this.fetchItems.bind(this);
        this.load = this.load.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.itemInEditMode = this.itemInEditMode.bind(this);
        this.toggleCreateMode = this.toggleCreateMode.bind(this);
        this.fetchItems();
    }

    fetchItems() {
        Api.fetch(this.state.type, this.state.orderby).then(this.load);
    }

    load(data) {
        this.setState({ items: data, fetching: false });
    }

    toggleEditMode() {
        this.setState({ inEditMode: !this.state.inEditMode });
    }

    itemInEditMode(key) {
        return this.state.itemInEditMode == key;
    }

    toggleCreateMode() {
        this.setState({ inCreateMode: !this.state.inCreateMode })
    }


    render() {
        return (
            <div className={this.props.type} >
                {
                    this.state.fetching && !this.state.items &&
                    <Loading />
                }
                {
                    !this.state.fetching &&
                    <React.Fragment>
                        <div className="title">{this.props.type}:</div>
                        <button className="link create" onClick={this.toggleCreateMode}>{this.state.inCreateMode ? <i className="fa fa-times-circle"></i> : <i className="fa fa-plus-circle"></i>}</button>
                        {
                            this.state.inCreateMode &&
                            React.cloneElement(this.state.create)
                        }
                    </React.Fragment>
                }
                {
                    !this.state.fetching && this.state.items &&
                    this.state.items.map((item, key) =>
                        <div className="relative" key={key}>
                            {
                                !this.itemInEditMode(key) &&
                                <React.Fragment>
                                    {React.cloneElement(this.state.view, { item: item })}
                                </React.Fragment>
                            }
                            {
                                this.itemInEditMode(key) &&
                                <div ref={node => this.node = node} >
                                    {React.cloneElement(this.state.update, { item: item })}
                                </div>
                            }
                            <div className="crud" onClick={() => this.setState({ itemInEditMode: key })}>
                                <CrudToggle saveCallback={() => alert("saved")} confirmCallback={() => { console.log(key + " " + this.state.itemInEditMode); alert("deleted") }} />
                            </div>
                        </div>
                    )
                }
                {
                    !this.state.fetching && !this.state.items &&
                    <div className="no-items">No items found</div>
                }
            </div>
        )
    }
}
