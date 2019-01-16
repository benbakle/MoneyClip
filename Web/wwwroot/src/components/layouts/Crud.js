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
            triggerUpdate: false,
        }

        this.fetchItems = this.fetchItems.bind(this);
        this.load = this.load.bind(this);
        this.itemInEditMode = this.itemInEditMode.bind(this);
        this.toggleCreateMode = this.toggleCreateMode.bind(this);
        this.saveAction = this.saveAction.bind(this);
        this.deleteAction = this.deleteAction.bind(this);
        this.editAction = this.editAction.bind(this);
        this.callback = this.callback.bind(this);
        this.handleClick = this.handleClick.bind(this);


        this.fetchItems();
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick(e) {
        if (this.node && this.node.contains(e.target)) {
            return;
        }
        this.setState({ itemInEditMode: -1, triggerUpdate: true })
    }

    fetchItems() {
        Api.fetch(`/api/${this.state.type}?${this.props.filter}`).then(this.load);
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
        this.setState({ itemInEditMode: -1, inCreateMode: false, triggerUpdate: false })
    }

    saveAction() {
        this.setState({ triggerUpdate: true });
        Notification.success({ text: "Saved!" })
    }

    deleteAction() {
        this.setState({ itemInEditMode: -1 });
        Notification.message({ text: "Hope you wanted to do that..." });
    }

    editAction(key) {
        this.setState({ itemInEditMode: key });
    }

    render() {
        return (
            <div className={this.props.type} ref={node => this.node = node}>
                <div className="title">{this.props.type}</div>
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

                    <div className={this.props.type}>
                        <div className={this.props.type.slice(0, -1)}>
                            {React.cloneElement(this.props.header)}
                        </div>
                    </div>
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
                                <div  >
                                    {React.cloneElement(this.state.update, { item: item, callback: this.callback, triggerUpdate: this.state.triggerUpdate })}
                                </div>
                            }
                            <div className="crud">
                                <CrudToggle saveAction={this.saveAction} deleteAction={this.deleteAction} editAction={() => this.editAction(key)} resetToggle={key != this.state.itemInEditMode} />
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
