import React from 'react';
import Api from '../../services/Api';
import Loading from '../Loading';
import Helpers from '../../Helpers';
import Money from '../Money';
import Moment from 'react-moment';
import View from '../account/View.js';
import CrudToggle from '../CrudToggle';
import Noty from 'noty';
import Notification from '../../services/Notification';

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
            inCreateMode: false,
            itemInEditMode: -1,
            inUpdateMode: false

        }

        this.fetchItems = this.fetchItems.bind(this);
        this.load = this.load.bind(this);
        this.itemInEditMode = this.itemInEditMode.bind(this);
        this.toggleCreateMode = this.toggleCreateMode.bind(this);
        this.saveCallback = this.saveCallback.bind(this);
        this.callback = this.callback.bind(this);

        this.fetchItems();
    }

    fetchItems() {
        Api.fetch(this.state.type, this.state.orderby).then(this.load);
    }

    load(data) {
        this.setState({ items: data, fetching: false });
    }

    itemInEditMode(key) {
        return this.state.itemInEditMode == key;
    }

    toggleCreateMode() {
        this.setState({ inCreateMode: !this.state.inCreateMode })
    }

    callback() {
        this.fetchItems();
        this.setState({ itemInEditMode: -1, inCreateMode: false, inUpdateMode: false })
    }

    saveCallback() {
        this.setState({ inUpdateMode: true });
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
                        <button className="link create" onClick={this.toggleCreateMode}>{this.state.inCreateMode ? <i className="fa fa-times-circle"></i> : <i className="fa fa-plus-circle"></i>}</button>
                        {
                            this.state.inCreateMode &&
                            React.cloneElement(this.state.create, { callback: this.callback })
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
                                    {React.cloneElement(this.state.update, { item: item, callback: this.callback, inUpdateMode: this.state.inUpdateMode })}
                                </div>
                            }
                            <div className="crud" onClick={() => this.setState({ itemInEditMode: key })}>
                                <CrudToggle saveCallback={this.saveCallback} confirmCallback={() => {Notification.error({text: "Deleted"})}} />
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
