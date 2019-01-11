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
            type: this.props.type,
            orderby: this.props.orderby,
            view: this.props.view,
            update: this.props.update,
            create: this.props.create,
            fetching: true,
            items: null,
            inEditMode: false,
            inCreateMode: false,

        }

        this.fetchItems = this.fetchItems.bind(this);
        this.load = this.load.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
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

    toggleCreateMode() {
        this.setState({ inCreateMode: !this.state.inCreateMode });
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.fetching && !this.state.items &&
                    <Loading />
                }
                {
                    !this.state.fetching &&
                    <React.Fragment>
                        <div className="title">{this.props.type}:</div>
                        <button className="link create" onClick={this.toggleCreateMode}>{this.state.inCreateMode ? <i className="fa fa-times-circle"></i> : <i className="fa fa-plus-circle"></i>}</button>
                        <button className="link toggle-edit" onClick={this.toggleEditMode}>{this.state.inEditMode ? <i className="fa fa-times-circle"></i> : <i className="fa fa-edit"></i>}</button>
                        {
                            this.state.inCreateMode &&
                            React.cloneElement(this.state.create)
                        }
                    </React.Fragment>
                }
                {
                    !this.state.fetching && this.state.items &&
                    <div className={this.props.type} >

                        {
                            this.state.items.map((item, key) =>
                                <React.Fragment key={key}>
                                    {
                                        !this.state.inEditMode &&
                                        React.cloneElement(this.state.view, { item: item })
                                    }
                                    {
                                        this.state.inEditMode &&
                                        React.cloneElement(this.state.update, { item: item })
                                    }
                                </React.Fragment>
                            )
                        }
                    </div>
                }
                {
                    !this.state.fetching && !this.state.items &&
                    <div className="no-items">No items found</div>
                }
            </React.Fragment>
        )
    }
}
