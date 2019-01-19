import React from 'react';
import Api from '../../services/Api';
import Loading from '../Loading';
import CrudToggle from '../CrudToggle';
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
    componentWillReceiveProps(props) {
        if (props.filter !== "")
            this.fetchItems(props.filter);
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

    fetchItems(filter) {
        filter = filter || this.props.filter;
        Api.fetch(`/api/${this.state.type}?${filter}`).then(this.load);
    }

    load(data) {
        this.setState({ items: data, fetching: false });
    }

    itemInEditMode(key) {
        return this.state.itemInEditMode === key;
    }

    toggleCreateMode() {
        this.setState({ inCreateMode: !this.state.inCreateMode })
    }

    callback() {
        this.fetchItems();
        this.setState({ itemInEditMode: -1, inCreateMode: false, triggerUpdate: false });
    }

    saveAction() {
        this.setState({ triggerUpdate: true });
        Notification.success({ text: "Saved!" })
    }

    deleteAction() {
        this.setState({ itemInEditMode: -1 });
        Notification.message({ text: "Bye, Felicia!" });
    }

    editAction(key) {
        this.setState({ itemInEditMode: key });
    }

    render() {
        return (
            <div className={`crud-layout ${this.props.type}`} ref={node => this.node = node}>
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
                    <div className={`${this.props.type.slice(0, -1)} crud-header`}>
                        {React.cloneElement(this.props.header)}
                    </div>
                }
                {
                    !this.state.fetching && this.state.items &&
                    this.state.items.map((item, key) =>
                        <div className={`${this.props.type.slice(0, -1)} crud-item`} key={key}>
                            {
                                !this.itemInEditMode(key) &&
                                <React.Fragment>
                                    {React.cloneElement(this.state.view, { item: item, callback: this.callback })}
                                </React.Fragment>
                            }
                            {
                                this.itemInEditMode(key) &&
                                React.cloneElement(this.state.update, { item: item, callback: this.callback, triggerUpdate: this.state.triggerUpdate })
                            }
                            <div className="crud cell">
                                <CrudToggle saveAction={this.saveAction} deleteAction={this.deleteAction} editAction={() => this.editAction(key)} resetToggle={key !== this.state.itemInEditMode} />
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
